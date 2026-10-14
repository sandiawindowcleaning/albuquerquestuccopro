import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft, BrickWall, Building2, Camera, CircleCheck, CircleHelp, CloudRain, Fence, Hammer, House,
  LoaderCircle, Palette, PaintRoller, Sparkles, Wrench, X, type LucideIcon,
} from 'lucide-react';
import { CallLink } from './CallLink';
import { BUSINESS } from '../config/business';
import { trackQuoteSubmit } from '../lib/analytics';
import {
  FORM_ENDPOINT, FORM_SOURCE, LEAD_SUBJECT, MAX_UPLOAD_BYTES, PHOTO_UPLOAD_ENABLED, preparePhoto, submitLead,
} from '../lib/submitLead';
import { formatPhone, isValidEmail, isValidZip, normalizePhone } from '../lib/validation';
import { btn } from '../lib/ui';

interface Choice {
  value: string;
  icon?: LucideIcon;
  hint?: string;
}

const AREA_CHOICES: Choice[] = [
  { value: 'Stucco repair', icon: Wrench },
  { value: 'Color coat / recoat', icon: PaintRoller },
  { value: 'Full re-stucco', icon: House },
  { value: 'Water damage / parapets', icon: CloudRain },
  { value: 'Garden wall', icon: Fence },
  { value: 'Not sure', icon: CircleHelp },
];
const OPENING_CHOICES: Choice[] = [
  { value: 'Small area or one crack' },
  { value: 'One or two walls' },
  { value: 'Whole house' },
  { value: 'Walls or fence only' },
  { value: 'Commercial building' },
];
const GOAL_CHOICES: Choice[] = [
  { value: 'Cracks', icon: BrickWall },
  { value: 'Holes or impact damage', icon: Hammer },
  { value: 'Stains, bubbling or soft spots', icon: CloudRain },
  { value: 'Faded or patchy color', icon: Palette },
  { value: 'Updating the look', icon: Sparkles },
  { value: 'New construction / addition', icon: Building2 },
];
const TIMELINE_CHOICES: Choice[] = [
  { value: 'As soon as possible' },
  { value: 'In 1–3 months' },
  { value: 'Just researching' },
];
const CONTACT_METHODS = ['Call', 'Text', 'Email'] as const;

type ChoiceKey = 'area' | 'openings' | 'goal' | 'timeline';
const CHOICE_STEPS: { key: ChoiceKey; title: string; sub?: string; choices: Choice[]; cols: string }[] = [
  { key: 'area', title: 'What kind of stucco work do you need?', choices: AREA_CHOICES, cols: 'grid-cols-2 sm:grid-cols-3' },
  { key: 'openings', title: 'How big is the project?', choices: OPENING_CHOICES, cols: 'grid-cols-1 sm:grid-cols-2' },
  { key: 'goal', title: 'What are you seeing?', sub: 'Pick the main one. You can add details at the end.', choices: GOAL_CHOICES, cols: 'grid-cols-2 sm:grid-cols-3' },
  { key: 'timeline', title: 'When are you hoping to get it done?', choices: TIMELINE_CHOICES, cols: 'grid-cols-1 sm:grid-cols-3' },
];
// The photo step only exists when photo upload is enabled (see submitLead.ts).
const PHOTO_STEP = PHOTO_UPLOAD_ENABLED ? CHOICE_STEPS.length : -1;
const CONTACT_STEP = CHOICE_STEPS.length + (PHOTO_UPLOAD_ENABLED ? 1 : 0);
const TOTAL_STEPS = CONTACT_STEP + 1;

interface Contact {
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  contactMethod: (typeof CONTACT_METHODS)[number];
  notes: string;
}
type Errors = Partial<Record<keyof Contact | 'photo' | 'form', string>>;

const inputCls =
  'mt-1.5 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-ink placeholder:text-stone-500 focus:border-chile-700 focus:outline-none focus:ring-2 focus:ring-chile-700/30 aria-[invalid=true]:border-red-700';

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<ChoiceKey, string>>({ area: '', openings: '', goal: '', timeline: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [contact, setContact] = useState<Contact>({
    name: '', phone: '', email: '', address: '', zip: '', contactMethod: 'Call', notes: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // After the first step change, move focus to the new question and bring it
  // into view (auto-advance would otherwise leave phones scrolled mid-page).
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
    const top = wrapRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) wrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, status]);

  const go = (n: number) => {
    moved.current = true;
    setStep(n);
  };

  const choose = (key: ChoiceKey, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    go(step + 1);
  };

  const onPhoto = (file: File | undefined) => {
    setErrors((e) => ({ ...e, photo: undefined }));
    if (!file) return setPhoto(null);
    if (!file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) {
      return setErrors((e) => ({ ...e, photo: 'Please choose a photo (JPG, PNG or HEIC).' }));
    }
    setPhoto(file);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (contact.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!normalizePhone(contact.phone)) e.phone = 'Please enter a 10-digit US phone number.';
    if (!isValidEmail(contact.email)) e.email = 'Please enter a valid email address.';
    if (!isValidZip(contact.zip)) e.zip = 'Please enter a 5-digit ZIP code.';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      let upload: File | null = null;
      if (PHOTO_UPLOAD_ENABLED && photo) {
        upload = await preparePhoto(photo);
        if (upload.size > MAX_UPLOAD_BYTES) {
          setStatus('idle');
          setErrors({ photo: 'That photo is too large to send. Please go back and choose a smaller one, or skip the photo.' });
          return;
        }
      }
      await submitLead(
        {
          formName: 'quote',
          ...answers,
          name: contact.name.trim(),
          phone: formatPhone(normalizePhone(contact.phone)!),
          email: contact.email.trim(),
          address: contact.address.trim(),
          zip: contact.zip.trim(),
          contactMethod: contact.contactMethod,
          notes: contact.notes.trim(),
          photo: upload,
        },
        honeypot,
      );
      trackQuoteSubmit({ goal: answers.goal, openings: answers.openings, area: answers.area });
      moved.current = true;
      setStatus('done');
    } catch {
      setStatus('idle');
      setErrors({ form: 'Sorry, your request didn’t go through.' });
    }
  };

  const set = (k: keyof Contact) => (ev: { target: { value: string } }) =>
    setContact((c) => ({ ...c, [k]: ev.target.value }));

  if (status === 'done') {
    const first = contact.name.trim().split(/\s+/)[0];
    const how = contact.contactMethod === 'Email' ? 'email' : contact.contactMethod === 'Text' ? 'text' : 'phone';
    return (
      <div ref={wrapRef} className="rounded-3xl border border-stone-300/70 bg-white p-6 text-center shadow-card sm:p-10" role="status">
        <CircleCheck className="mx-auto h-14 w-14 text-chile-700" aria-hidden="true" />
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-3xl font-semibold text-ink outline-none">
          Thanks{first ? `, ${first}` : ''}! We’ll reach out shortly about your stucco project.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft">
          We’ll reach out by {how} to schedule your free on-site estimate. We’ll inspect your stucco, look for
          the cause of any damage and give you a written estimate.
        </p>
        <p className="mt-6 text-ink-soft">
          Prefer to talk now? <CallLink location="quote-thank-you" className="font-semibold text-chile-700 underline" />
        </p>
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div ref={wrapRef} className="scroll-mt-24 rounded-3xl border border-stone-300/70 bg-white p-5 shadow-card sm:p-8">
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-sand-200"
        role="progressbar"
        aria-label="Quote request progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className="h-full rounded-full bg-chile-700 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 min-h-[18rem]">
        {step < CHOICE_STEPS.length && (() => {
          const s = CHOICE_STEPS[step];
          return (
            <StepFrame title={s.title} sub={s.sub} headingRef={headingRef}>
              <div className={`grid gap-3 ${s.cols}`}>
                {s.choices.map((c) => {
                  const selected = answers[s.key] === c.value;
                  const I = c.icon;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(s.key, c.value)}
                      className={`flex min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-2xl border-2 px-3 py-4 text-center font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chile-700 ${
                        selected ? 'border-chile-700 bg-chile-50 text-chile-900' : 'border-stone-300 bg-sand-50 text-ink hover:border-chile-600'
                      } ${I ? '' : 'text-xl'}`}
                    >
                      {I && <I className="h-7 w-7 text-chile-700" aria-hidden="true" />}
                      <span className={I ? 'text-[15px]' : ''}>{c.value}</span>
                    </button>
                  );
                })}
              </div>
            </StepFrame>
          );
        })()}

        {step === PHOTO_STEP && (
          <StepFrame
            title="Have a photo of the damage?"
            sub="Optional, but it helps us plan your estimate. A close-up plus a wide shot of the wall is perfect."
            headingRef={headingRef}
          >
            {photo ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-stone-300 bg-sand-50 px-4 py-3">
                <span className="flex min-w-0 items-center gap-3">
                  <Camera className="h-5 w-5 shrink-0 text-chile-700" aria-hidden="true" />
                  <span className="truncate text-ink">{photo.name}</span>
                </span>
                <button type="button" onClick={() => setPhoto(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-stone-600 hover:text-ink">
                  <X className="h-4 w-4" aria-hidden="true" /> Remove
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 bg-sand-50 px-4 py-10 text-center hover:border-chile-600">
                <Camera className="h-8 w-8 text-chile-700" aria-hidden="true" />
                <span className="font-semibold text-ink">Tap to add a photo</span>
                <span className="text-sm text-stone-600">JPG, PNG or HEIC</span>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  className="sr-only"
                  onChange={(e) => onPhoto(e.target.files?.[0])}
                />
              </label>
            )}
            {errors.photo && <p className="mt-2 text-sm font-medium text-red-700" role="alert">{errors.photo}</p>}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" className={btn.primary} onClick={() => go(CONTACT_STEP)}>
                {photo ? 'Continue' : 'Skip this step'}
              </button>
            </div>
          </StepFrame>
        )}

        {step === CONTACT_STEP && (
          <StepFrame
            title="Where should we reach you?"
            sub="We’ll contact you to set up your free on-site estimate."
            headingRef={headingRef}
          >
            <form action={FORM_ENDPOINT} method="POST" onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="_subject" value={LEAD_SUBJECT} />
              <input type="hidden" name="form_source" value={FORM_SOURCE.quote} />
              {/* Earlier steps' answers, so a native (no-JS) post carries them too. */}
              <input type="hidden" name="service_type" value={answers.area} />
              <input type="hidden" name="project_size" value={answers.openings} />
              <input type="hidden" name="main_issue" value={answers.goal} />
              <input type="hidden" name="timeline" value={answers.timeline} />
              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Company website
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
              </div>

              <Field id="q-name" label="Full name" error={errors.name} className="sm:col-span-2">
                <input id="q-name" name="name" autoComplete="name" value={contact.name} onChange={set('name')} className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'q-name-err' : undefined} />
              </Field>
              <Field id="q-phone" label="Phone" error={errors.phone}>
                <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(505) 555-0123" value={contact.phone} onChange={set('phone')} className={inputCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'q-phone-err' : undefined} />
              </Field>
              <Field id="q-email" label="Email" error={errors.email}>
                <input id="q-email" name="email" type="email" inputMode="email" autoComplete="email" required value={contact.email} onChange={set('email')} className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'q-email-err' : undefined} />
              </Field>
              <Field id="q-address" label="Street address (optional)">
                <input id="q-address" name="address" autoComplete="street-address" value={contact.address} onChange={set('address')} className={inputCls} />
              </Field>
              <Field id="q-zip" label="ZIP code" error={errors.zip}>
                <input id="q-zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={contact.zip} onChange={set('zip')} className={inputCls} aria-invalid={!!errors.zip} aria-describedby={errors.zip ? 'q-zip-err' : undefined} />
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="text-[15px] font-semibold text-ink">Best way to reach you</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((m) => (
                    <label
                      key={m}
                      className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-2.5 font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-chile-700 ${
                        contact.contactMethod === m ? 'border-chile-700 bg-chile-50 text-chile-900' : 'border-stone-300 text-ink'
                      }`}
                    >
                      <input type="radio" name="preferred_contact" value={m} checked={contact.contactMethod === m} onChange={() => setContact((c) => ({ ...c, contactMethod: m }))} className="sr-only" />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field id="q-notes" label="Anything else we should know? (optional)" className="sm:col-span-2">
                <textarea id="q-notes" name="message" rows={3} value={contact.notes} onChange={set('notes')} className={inputCls} />
              </Field>

              {errors.form && (
                <p className="text-sm font-medium text-red-700 sm:col-span-2" role="alert">
                  {errors.form} Please try again, or call us at{' '}
                  <CallLink location="quote-error" className="underline" />.
                </p>
              )}
              {errors.photo && <p className="text-sm font-medium text-red-700 sm:col-span-2" role="alert">{errors.photo}</p>}

              <div className="sm:col-span-2">
                <button type="submit" className={`${btn.quote} w-full sm:w-auto`} disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <><LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</>
                  ) : (
                    'Request My Free Estimate'
                  )}
                </button>
                <p className="mt-3 text-sm text-stone-600">
                  We only use your information to contact you about your project. No spam, and we never sell your details.
                </p>
              </div>
            </form>
          </StepFrame>
        )}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => go(step - 1)}
          className="mt-6 inline-flex items-center gap-1.5 font-semibold text-stone-600 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>
      )}
      <p className="sr-only" aria-live="polite">Step {step + 1} of {TOTAL_STEPS}</p>
      <p className="mt-4 text-center text-sm text-stone-600 sm:hidden">
        Rather talk? Call <CallLink location="quote-footer" className="font-semibold text-chile-700">{BUSINESS.phoneDisplay}</CallLink>
      </p>
    </div>
  );
}

function StepFrame({
  title, sub, headingRef, children,
}: { title: string; sub?: string; headingRef: React.RefObject<HTMLHeadingElement | null>; children: ReactNode }) {
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold text-ink outline-none sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-2 text-ink-soft">{sub}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  id, label, error, className = '', children,
}: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[15px] font-semibold text-ink">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
