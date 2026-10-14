import { useState, type FormEvent } from 'react';
import { CircleCheck, LoaderCircle } from 'lucide-react';
import { CallLink } from './CallLink';
import { trackContactSubmit } from '../lib/analytics';
import { FORM_ENDPOINT, FORM_SOURCE, LEAD_SUBJECT, submitLead } from '../lib/submitLead';
import { formatPhone, isValidEmail, normalizePhone } from '../lib/validation';
import { btn } from '../lib/ui';

const inputCls =
  'mt-1.5 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-ink focus:border-chile-700 focus:outline-none focus:ring-2 focus:ring-chile-700/30 aria-[invalid=true]:border-red-700';

type Errs = Partial<Record<'name' | 'phone' | 'email' | 'message' | 'form', string>>;

export function ContactForm() {
  const [v, setV] = useState({ name: '', phone: '', email: '', message: '' });
  const [hp, setHp] = useState('');
  const [errors, setErrors] = useState<Errs>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errs = {};
    if (v.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!normalizePhone(v.phone)) e.phone = 'Please enter a 10-digit US phone number.';
    if (!isValidEmail(v.email)) e.email = 'Please enter a valid email address.';
    if (v.message.trim().length < 5) e.message = 'Please add a short message.';
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`c-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await submitLead(
        {
          formName: 'contact',
          name: v.name.trim(),
          phone: formatPhone(normalizePhone(v.phone)!),
          email: v.email.trim(),
          message: v.message.trim(),
        },
        hp,
      );
      trackContactSubmit();
      setStatus('done');
    } catch {
      setStatus('idle');
      setErrors({ form: 'Sorry, your message didn’t go through.' });
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-stone-300/70 bg-white p-8 text-center" role="status">
        <CircleCheck className="mx-auto h-12 w-12 text-chile-700" aria-hidden="true" />
        <p className="mt-3 font-display text-2xl font-semibold text-ink">Thanks! We’ll reach out shortly about your stucco project.</p>
      </div>
    );
  }

  const field = (k: 'name' | 'phone' | 'email', label: string, props: Record<string, string | boolean>) => (
    <div>
      <label htmlFor={`c-${k}`} className="text-[15px] font-semibold text-ink">{label}</label>
      <input
        id={`c-${k}`}
        name={k}
        value={v[k]}
        onChange={(e) => setV({ ...v, [k]: e.target.value })}
        className={inputCls}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        {...props}
      />
      {errors[k] && <p id={`c-${k}-err`} className="mt-1.5 text-sm font-medium text-red-700">{errors[k]}</p>}
    </div>
  );

  return (
    <form action={FORM_ENDPOINT} method="POST" onSubmit={onSubmit} noValidate className="grid gap-4 rounded-2xl border border-stone-300/70 bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <input type="hidden" name="_subject" value={LEAD_SUBJECT} />
      <input type="hidden" name="form_source" value={FORM_SOURCE.contact} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Company website<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
      </div>
      <div className="sm:col-span-2">{field('name', 'Name', { autoComplete: 'name' })}</div>
      {field('phone', 'Phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', required: true })}
      {field('email', 'Email', { type: 'email', inputMode: 'email', autoComplete: 'email', required: true })}
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="text-[15px] font-semibold text-ink">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          value={v.message}
          onChange={(e) => setV({ ...v, message: e.target.value })}
          className={inputCls}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'c-message-err' : undefined}
        />
        {errors.message && <p id="c-message-err" className="mt-1.5 text-sm font-medium text-red-700">{errors.message}</p>}
      </div>
      {errors.form && (
        <p className="text-sm font-medium text-red-700 sm:col-span-2" role="alert">
          {errors.form} Please try again or call <CallLink location="contact-error" className="underline" />.
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className={btn.primary} disabled={status === 'sending'}>
          {status === 'sending' ? <><LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</> : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
