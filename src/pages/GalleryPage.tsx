import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { GalleryGrid, hasRealPhotos } from '../components/GalleryGrid';
import { GALLERY } from '../config/images';
import { PATHS } from '../lib/paths';
import { h2 } from '../lib/ui';

export function GalleryPage() {
  const real = hasRealPhotos(GALLERY);
  return (
    <>
      <PageHero title="Stucco Project Gallery: Albuquerque Area">
        <p>
          {real
            ? 'A look at stucco repairs, color coats and re-stucco projects around Albuquerque.'
            : 'Project photos are on the way. The best way to judge stucco colors and textures is on your own walls anyway, and we bring samples to every free estimate.'}
        </p>
      </PageHero>
      <Section tone="light" labelledBy="gallery-heading">
        <h2 id="gallery-heading" className={h2}>Repairs, recoats and re-stucco</h2>
        <div className="mt-8"><GalleryGrid slots={GALLERY} /></div>
        <p className="mt-8 text-ink-soft">
          Want to see colors and textures on your own walls?{' '}
          <Link to={PATHS.quote} className="font-semibold text-chile-700 underline">Book a free estimate</Link>.
        </p>
      </Section>
    </>
  );
}
