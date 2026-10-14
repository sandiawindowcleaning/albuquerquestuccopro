import type { ReactNode } from 'react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { BUSINESS, mailHref } from '../config/business';

// Plain-language starting points, not legal advice. Have them reviewed before
// launch, and update LAST_UPDATED whenever the text changes.
const LAST_UPDATED = 'October 8, 2026';

function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} ctas={false}>
        <p>Last updated: {LAST_UPDATED}</p>
      </PageHero>
      <Section tone="light">
        <div className="max-w-prose space-y-4 leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_a]:text-chile-700 [&_a]:underline">
          {children}
        </div>
      </Section>
    </>
  );
}

const Email = () => <a href={mailHref}>{BUSINESS.email}</a>;

export function PrivacyPage() {
  return (
    <Legal title="Privacy Policy">
      <p>
        This policy explains what information {BUSINESS.name} (“we”, “us”) collects through albuquerquestuccopro.com, how we
        use it and the choices you have.
      </p>

      <h2>Information you give us</h2>
      <p>When you request a quote or send a message, we collect what you enter, which may include:</p>
      <ul>
        <li>Your name, phone number, email address, street address and ZIP code</li>
        <li>Details about your project, such as the type of stucco work, the size of the project, the problem you’re seeing and your timeline</li>
        <li>Any photo you choose to upload, and any notes you add</li>
        <li>Your preferred contact method</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To contact you about your request and schedule an estimate</li>
        <li>To prepare quotes and provide our services</li>
        <li>To respond to questions and provide customer service</li>
        <li>To improve our website and understand which marketing works</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Information collected automatically</h2>
      <p>
        Like most websites, we use cookies and similar technologies through analytics and advertising services, including
        Google Analytics, Google Ads and the Meta Pixel. These services may collect information such as pages visited,
        device and browser type, approximate location and how you arrived at the site. We use this to measure site traffic
        and the performance of our advertising, including when a quote form is submitted or a phone link is tapped.
      </p>
      <p>
        You can limit this tracking with your browser’s cookie settings, by installing the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener" target="_blank">Google Analytics opt-out add-on</a>,
        and through the ad settings in your Google and Meta accounts.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share information only with service providers that help us run the business and this website, such as our
        website host and form-processing service, customer management tools, and the analytics and advertising services
        listed above. We may also disclose information if required by law.
      </p>

      <h2>Text messages and calls</h2>
      <p>
        If you give us your phone number, we may call or text you about your request. Message and data rates may apply.
        Reply STOP to any text to opt out of further texts.
      </p>

      <h2>Data retention and security</h2>
      <p>
        We keep your information as long as needed to respond to your request, provide our services and meet legal or
        business requirements. We use reasonable measures to protect it, but no method of transmission or storage is
        completely secure.
      </p>

      <h2>Children</h2>
      <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>

      <h2>Your choices</h2>
      <p>
        To ask what information we have about you, or to ask us to correct or delete it, email <Email />.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <Email />.
      </p>
    </Legal>
  );
}

export function TermsPage() {
  return (
    <Legal title="Terms of Use">
      <p>
        These terms govern your use of albuquerquestuccopro.com, operated by {BUSINESS.name}. By using the site, you agree to
        them.
      </p>

      <h2>Information on this site</h2>
      <p>
        We try to keep the content on this website accurate and current, but it is general information about our products
        and services. Product features, fabric options and availability can change. Nothing on this site is a binding offer.
      </p>

      <h2>Quotes and services</h2>
      <p>
        Submitting a request through this website does not create a contract. Pricing, scope, timelines and any warranty
        coverage are set only in a written quote or agreement provided after your estimate.
      </p>

      <h2>Your submissions</h2>
      <p>
        When you submit information or photos through this site, you confirm that the information is accurate and that you
        have the right to share any photos you upload. We use submissions as described in our Privacy Policy.
      </p>

      <h2>Acceptable use</h2>
      <p>Don’t misuse the site, including by submitting spam, attempting to interfere with its operation or scraping it.</p>

      <h2>Intellectual property</h2>
      <p>
        The text, design, logos and images on this site belong to {BUSINESS.name} or are used with permission. Don’t copy
        or reuse them without our written consent.
      </p>

      <h2>Third-party links</h2>
      <p>Links to other websites are provided for convenience. We aren’t responsible for their content or practices.</p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The site is provided “as is”, without warranties of any kind. To the extent allowed by law, {BUSINESS.name} is not
        liable for damages arising from your use of the website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of New Mexico.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <Email />.
      </p>
    </Legal>
  );
}
