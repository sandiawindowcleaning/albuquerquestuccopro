import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ChevronDown, CircleCheck, LoaderCircle } from 'lucide-react';
import { CallLink } from './CallLink';
import { trackInspectionSubmit } from '../lib/analytics';
import { FORM_ENDPOINT, FORM_SOURCE, LEAD_SUBJECT, submitLead } from '../lib/submitLead';
import { formatPhone, isValidEmail, isValidZip, normalizePhone } from '../lib/validation';
import { btn } from '../lib/ui';

// Home page hero form. Sends through submitLead() (Formspree, JSON via fetch)
// like every other form; the action/method/hidden fields are the no-JS
// fallback, so the same field names are used in both paths.

const PROJECT_TYPES = ['Crack repair', 'Patch / hole repair', 'Water damage', 'Recoat / color coat', 'Full re-stucco', 'Not sure'];
const AREAS = ['Small patch', 'One wall', 'Several walls', 'Whole house', 'Not sure'];
const TIMEFRAMES = ['ASAP', '1–3 months', '3–6 months', 'Just researching'];
const STUCCO_TYPES = ['Traditional', 'Synthetic (EIFS)', 'Not sure'];

type Key =
  | 'firstName' | 'lastName' | 'phone' | 'zip' | 'email'
  | 'projectType' | 'areaAffected' | 'timeframe' | 'stuccoType' | 'message';
type Errs = Partial<Record<Key | 'form', string>>;

const EMPTY: Record<Key, string> = {
  firstName: '', lastName: '', phone: '', zip: '', email: '',
  projectType: '', areaAffected: '', timeframe: '', stuccoType: '', message: '',
};

const fieldCls =
  'mt-1.5 block h-14 w-full scroll-mt-28 scroll-mb-40 rounded-xl border border-stone-300 bg-sand-50 px-4 text-base text-ink placeholder:text-stone-500 focus:border-chile-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-chile-700/30 aria-[invalid=true]:border-red-700';

export function HeroLeadForm() {
  const [v, setV] = useState(EMPTY);
  const [hp, setHp] = useState('');
  const [errors, setErrors] = useState<Errs>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const doneRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = (k: Key) => (e: { target: { value: string } }) => setV((x) => ({ ...x, [k]: e.target.value }));
  const err = (k: Key) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `h-${k}-err` : undefined,
  });

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errs = {};
    if (!v.firstName.trim()) e.firstName = 'Please enter your first name.';
    if (!normalizePhone(v.phone)) e.phone = 'Please enter a 10-digit US phone number.';
    if (!isValidZip(v.zip)) e.zip = 'Please enter a 5-digit ZIP code.';
    if (v.email.trim() && !isValidEmail(v.email)) e.email = 'Please enter a valid email address.';
    if (!v.projectType) e.projectType = 'Please choose a project type.';
    setErrors(e);
    if (Object.keys(e).length) {
      // Scroll the first problem field to the middle of the screen (clear of
      // the sticky header and the phone keyboard), then focus it.
      const first = document.getElementById(`h-${Object.keys(e)[0]}`);
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first?.focus({ preventScroll: true });
      return;
    }
    setStatus('sending');
    try {
      await submitLead(
        {
          formName: 'inspection',
          firstName: v.firstName.trim(),
          lastName: v.lastName.trim(),
          phone: formatPhone(normalizePhone(v.phone)!),
          zip: v.zip.trim(),
          email: v.email.trim(),
          projectType: v.projectType,
          areaAffected: v.areaAffected,
          timeframe: v.timeframe,
          stuccoType: v.stuccoType,
          message: v.message.trim(),
        },
        hp,
      );
      trackInspectionSubmit({ project_type: v.projectType, area_affected: v.areaAffected, timeframe: v.timeframe });
      setStatus('done');
      // The card shrinks to the thank-you message; bring it on screen so phone
      // users see it without hunting.
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        doneRef.current?.focus({ preventScroll: true });
      });
    } catch {
      setStatus('idle');
      setErrors({ form: 'Sorry, your request didn’t go through.' });
    }
  };

  const card = 'rounded-3xl bg-white p-6 shadow-[0_24px_60px_-20px_rgb(42_37_34/0.45)] ring-1 ring-black/5 sm:p-8';

  if (status === 'done') {
    return (
      <div ref={cardRef} className={`${card} scroll-mt-24 text-center`} role="status">
        <CircleCheck className="mx-auto h-14 w-14 text-chile-700" aria-hidden="true" />
        <h2 ref={doneRef} tabIndex={-1} className="mt-4 font-display text-2xl font-semibold text-ink outline-none sm:text-3xl">
          Thanks{v.firstName.trim() ? `, ${v.firstName.trim()}` : ''}! We’ll reach out shortly about your stucco project.
        </h2>
        <p className="mt-3 text-ink-soft">
          Prefer to talk now? <CallLink location="hero-form-thank-you" className="font-semibold text-chile-700 underline" />
        </p>
      </div>
    );
  }

  return (
    <div ref={cardRef} className={card}>
      <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
        Book your free stucco inspection
      </h2>
      <p className="mt-2 text-ink-soft">Inspection and measurement at your home. No obligation.</p>

      <form action={FORM_ENDPOINT} method="POST" onSubmit={onSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="_subject" value={LEAD_SUBJECT} />
        <input type="hidden" name="form_source" value={FORM_SOURCE.inspection} />
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company website
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </label>
        </div>

        <Field id="h-firstName" label="First name" required error={errors.firstName}>
          <input id="h-firstName" name="first_name" autoComplete="given-name" required value={v.firstName} onChange={set('firstName')} className={fieldCls} {...err('firstName')} />
        </Field>
        <Field id="h-lastName" label="Last name">
          <input id="h-lastName" name="last_name" autoComplete="family-name" value={v.lastName} onChange={set('lastName')} className={fieldCls} />
        </Field>
        <Field id="h-phone" label="Phone" required error={errors.phone}>
          <input id="h-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(505) 555-0123" value={v.phone} onChange={set('phone')} className={fieldCls} {...err('phone')} />
        </Field>
        <Field id="h-zip" label="ZIP code" required error={errors.zip}>
          <input id="h-zip" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} required value={v.zip} onChange={set('zip')} className={fieldCls} {...err('zip')} />
        </Field>
        <Field id="h-email" label="Email" error={errors.email} className="sm:col-span-2">
          <input id="h-email" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set('email')} className={fieldCls} {...err('email')} />
        </Field>

        <Select id="h-projectType" name="project_type" label="Project type" required options={PROJECT_TYPES} value={v.projectType} onChange={set('projectType')} error={errors.projectType} />
        <Select id="h-areaAffected" name="area_affected" label="Area affected" options={AREAS} value={v.areaAffected} onChange={set('areaAffected')} />
        <Select id="h-timeframe" name="timeframe" label="Timeframe" options={TIMEFRAMES} value={v.timeframe} onChange={set('timeframe')} />
        <Select id="h-stuccoType" name="stucco_type" label="Stucco type" options={STUCCO_TYPES} value={v.stuccoType} onChange={set('stuccoType')} />

        <Field id="h-message" label="Tell us about your project (optional)" className="sm:col-span-2">
          <textarea
            id="h-message"
            name="message"
            rows={3}
            placeholder="Cracks around windows, bubbling after the monsoon, faded color, buying or selling the house..."
            value={v.message}
            onChange={set('message')}
            className={`${fieldCls} h-auto min-h-[6.5rem] py-3`}
          />
        </Field>

        {errors.form && (
          <p className="text-sm font-medium text-red-700 sm:col-span-2" role="alert">
            {errors.form} Please try again, or call us at <CallLink location="hero-form-error" className="underline" />.
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className={`${btn.primary} h-14 w-full text-lg`} disabled={status === 'sending'}>
            {status === 'sending' ? (
              <><LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</>
            ) : (
              'Get My Free Inspection'
            )}
          </button>
          <p className="mt-3 text-center text-sm text-stone-600">
            We only use your details to contact you about your project.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  id, label, required, error, className = '', children,
}: { id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[15px] font-bold text-ink">
        {label}
        {required && <span className="text-chile-700" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

function Select({
  id, name, label, options, value, onChange, required, error,
}: {
  id: string; name: string; label: string; options: string[]; value: string;
  onChange: (e: { target: { value: string } }) => void; required?: boolean; error?: string;
}) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`${fieldCls} appearance-none pr-11 ${value ? '' : 'text-stone-600'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
        >
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-[3px] h-5 w-5 -translate-y-1/2 text-stone-600" aria-hidden="true" />
      </div>
    </Field>
  );
}
