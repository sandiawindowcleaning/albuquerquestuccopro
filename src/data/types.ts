export interface Faq {
  q: string;
  a: string;
}

export interface Section {
  heading: string;
  paragraphs: string[];
}

export type IconName =
  | 'brick-wall' | 'paint-roller' | 'hammer' | 'snowflake' | 'cloud-rain' | 'building'
  | 'fence' | 'mountain' | 'search' | 'bug' | 'sun' | 'eye-off' | 'wrench'
  | 'shield' | 'wind' | 'ruler' | 'home' | 'sparkles'
  | 'droplets' | 'leaf' | 'flame' | 'palette' | 'clock' | 'layers';

export interface Benefit {
  icon: IconName;
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Short label for nav menus and cards. */
  shortName: string;
  icon: IconName;
  cardBlurb: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  benefitsHeading: string;
  benefits: Benefit[];
  included: string[];
  bestFor: string[];
  local: Section;
  faqs: Faq[];
  related: string[];
  featuredAreas: string[];
}

export interface Area {
  slug: string;
  name: string;
  /** Used for schema: City for incorporated cities, Place otherwise. */
  kind: 'City' | 'Place';
  county: string;
  /** Wikipedia article for the place (schema sameAs entity link). */
  wikipedia: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  sections: Section[];
  /** Services to feature on this page, each with a reason specific to the area. */
  focus: { service: string; why: string }[];
  faqs: Faq[];
  nearby: string[];
}
