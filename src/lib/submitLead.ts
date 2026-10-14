// ─────────────────────────────────────────────────────────────────────────────
// Lead submission. Every form on the site calls submitLead(); nothing else
// knows where leads go.
//
// Leads go to Formspree as JSON (fetch, no page redirect). The JSON keys below
// are exactly what shows up in each Formspree submission, so keep them
// readable. To send leads somewhere else later (a CRM), change FORM_ENDPOINT
// or add a second fetch in submitLead().
// ─────────────────────────────────────────────────────────────────────────────

export const FORM_ENDPOINT = 'https://formspree.io/f/mqpegaqy';

/** Subject line on every lead email. */
export const LEAD_SUBJECT = 'New Stucco ABQ Lead';

/**
 * `form_source` values, one per form, so each lead shows where it came from.
 * The same strings are rendered as hidden inputs in each <form> (used if JS
 * hasn't loaded and the browser posts the form natively).
 */
export const FORM_SOURCE = {
  quote: 'Quote page - quote wizard',
  contact: 'Contact page - contact form',
} as const;

/**
 * The quote form's optional photo step. OFF because leads are sent as JSON,
 * which can't carry a file. Turning it on also needs a multipart (FormData)
 * upload path in submitLead(), and Formspree only accepts files on paid plans.
 */
export const PHOTO_UPLOAD_ENABLED = false;

/** Upper limit for a photo, if photo upload is ever enabled. */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export interface QuoteLead {
  formName: 'quote';
  area: string;
  openings: string;
  goal: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  contactMethod: string;
  notes: string;
  photo?: File | null;
}

export interface ContactLead {
  formName: 'contact';
  name: string;
  phone: string;
  email: string;
  message: string;
}

export type Lead = QuoteLead | ContactLead;

export class LeadError extends Error {}

/** Field names as they appear in Formspree. */
function toPayload(lead: Lead, honeypot: string): Record<string, string> {
  const common = {
    _subject: LEAD_SUBJECT,
    form_source: FORM_SOURCE[lead.formName],
    page_url: window.location.href,
    _gotcha: honeypot,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
  };
  if (lead.formName === 'contact') return { ...common, message: lead.message };
  return {
    ...common,
    address: lead.address,
    zip: lead.zip,
    service_type: lead.area,
    project_size: lead.openings,
    main_issue: lead.goal,
    timeline: lead.timeline,
    preferred_contact: lead.contactMethod,
    message: lead.notes,
  };
}

/**
 * Sends a lead and resolves only when Formspree confirms it (HTTP 2xx).
 * Throws LeadError otherwise, so callers can show the error state and must
 * not fire conversion events.
 *
 * `honeypot` is the hidden `_gotcha` field. If a bot filled it in, we skip the
 * request and pretend it worked, so spam never reaches Formspree.
 */
export async function submitLead(lead: Lead, honeypot = ''): Promise<void> {
  if (honeypot.trim()) return;
  let res: Response;
  try {
    res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(toPayload(lead, honeypot)),
    });
  } catch {
    throw new LeadError('Network error: could not reach the form service.');
  }
  if (!res.ok) {
    let detail = `Form service returned ${res.status}`;
    try {
      const data = await res.json();
      if (Array.isArray(data?.errors) && data.errors.length) {
        detail = data.errors.map((e: { message?: string }) => e.message).filter(Boolean).join('; ') || detail;
      }
    } catch { /* non-JSON error body */ }
    throw new LeadError(detail);
  }
}

/**
 * Shrinks a large phone photo before upload. Only used if
 * PHOTO_UPLOAD_ENABLED is turned on. Falls back to the original file if the
 * browser can't decode it (e.g. some HEIC files on desktop).
 */
export async function preparePhoto(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024 || typeof createImageBitmap !== 'function') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}
