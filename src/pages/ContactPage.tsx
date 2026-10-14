import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ContactForm } from '../components/ContactForm';
import { CallLink } from '../components/CallLink';
import { BUSINESS, fullAddress, mailHref } from '../config/business';
import { PATHS } from '../lib/paths';
import { btn, h2 } from '../lib/ui';

export function ContactPage() {
  return (
    <>
      <PageHero title="Contact Albuquerque Stucco" ctas={false}>
        <p>
          Questions about a crack, a stain, a color coat or your estimate? Call, email or send a message. If you’re ready
          for a quote, the{' '}
          <Link to={PATHS.quote} className="font-semibold text-chile-700 underline">quote form</Link> is the fastest way to
          get on the schedule.
        </p>
      </PageHero>
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className={h2}>Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <CallLink location="contact-page" className="text-chile-700 underline" />
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <a href={mailHref} className="text-chile-700 underline">{BUSINESS.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">Address</p>
                  <address className="not-italic text-ink-soft">{fullAddress}</address>
                  <p className="text-ink-soft">Serving <Link to={PATHS.areas} className="text-chile-700 underline">Greater Albuquerque</Link>.</p>
                </div>
              </li>
              {BUSINESS.hours.confirmed && (
                <li className="flex gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Hours</p>
                    <p className="text-ink-soft">{BUSINESS.hours.display}</p>
                  </div>
                </li>
              )}
            </ul>
            <Link to={PATHS.quote} className={`${btn.quote} mt-8`}>Get a Free Quote</Link>
            {BUSINESS.mapEmbedUrl && (
              <iframe
                src={BUSINESS.mapEmbedUrl}
                title={`${BUSINESS.name} on Google Maps`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-8 aspect-[4/3] w-full rounded-2xl border-0"
              />
            )}
          </div>
          <div>
            <h2 className="sr-only">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
