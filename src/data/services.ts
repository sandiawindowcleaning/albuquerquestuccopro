import type { Service } from './types';

// Copy rules (see CLAUDE.md): no prices, no warranty terms, no review or
// project counts, no years in business. Albuquerque Stucco does the work.

export const SERVICES: Service[] = [
  {
    slug: 'stucco-repair',
    name: 'Stucco Repair',
    shortName: 'Stucco Repair',
    icon: 'wrench',
    cardBlurb:
      'Cracks, holes, chips and damaged corners repaired, textured to match and color-blended so the fix doesn’t stand out.',
    seoTitle: 'Stucco Repair Albuquerque NM | Albuquerque Stucco',
    seoDescription:
      'Stucco crack and damage repair for Albuquerque homes. We find the cause, repair the wall, match the texture and blend the color. Free on-site estimate.',
    h1: 'Stucco Repair in Albuquerque',
    intro: [
      'Most stucco problems start small: a crack running off the corner of a window, a chip where the mower hit the wall, a soft spot under a canale. Left alone, those small openings let water into the wall, and water is what turns a quick patch into a bigger job.',
      'We repair stucco the way it was built. We cut out loose or damaged material, fix the lath underneath if it needs it, rebuild the coats, then match the texture and blend the color into the wall around it. At your free on-site estimate we look at the damage, tell you what we think caused it and explain what the repair involves.',
    ],
    benefitsHeading: 'What a proper stucco repair includes',
    benefits: [
      { icon: 'search', title: 'We look for the cause', body: 'A crack is a symptom. We check for movement, water, failed flashing or a leaking canale so the same crack doesn’t come back.' },
      { icon: 'layers', title: 'Rebuilt in layers', body: 'Damaged areas are rebuilt coat by coat over sound lath, not just smeared over with a patch that sits on the surface.' },
      { icon: 'brick-wall', title: 'Texture matched', body: 'Sand, dash, smooth or a hand-troweled Santa Fe finish. We match the texture so the repair blends into the wall.' },
      { icon: 'palette', title: 'Color blended', body: 'Stucco color changes as it ages in the sun. We blend the repair into the wall, and tell you honestly when a full-wall color coat will look better than a patch.' },
      { icon: 'droplets', title: 'Sealed against water', body: 'Cracks are sealed so monsoon rain and melting snow can’t get behind the stucco.' },
      { icon: 'sparkles', title: 'Clean job site', body: 'We protect windows, landscaping and walkways while we work and clean up when we’re done.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Removal of loose, cracked or damaged stucco',
      'Lath and weep screed repair where needed',
      'Base coats rebuilt and cured',
      'Texture matched to the existing wall',
      'Color blended, or a full-wall color coat if you choose',
      'Cleanup and a final walkthrough',
    ],
    bestFor: [
      'Cracks around windows, doors and corners',
      'Holes and impact damage',
      'Stucco pulling away at the bottom of the wall',
      'Damage left after a window, door or utility change',
    ],
    local: {
      heading: 'Why stucco cracks in Albuquerque',
      paragraphs: [
        'Albuquerque is hard on stucco. Strong sun heats walls during the day, and nights can drop fast, so the wall expands and contracts constantly. In winter, water that gets into a crack can freeze overnight and widen it. Spring winds drive dust and grit into every opening, and monsoon storms in late summer can push a lot of water at a wall in a short time.',
        'Soils matter too. Some parts of the metro have soils that shift when they get wet, and when a foundation moves even slightly, stucco is usually where you see it first. We’ll tell you if a crack pattern suggests movement worth having looked at before we repair it.',
      ],
    },
    faqs: [
      {
        q: 'How much does stucco repair cost?',
        a: 'It depends on the size of the damage, what caused it, whether the lath underneath needs work and how much color blending is involved. We give you a written estimate after looking at the wall in person. We don’t quote prices sight unseen, because any number would be a guess.',
      },
      {
        q: 'Will the repair match the rest of my wall?',
        a: 'We match the texture closely and blend the color. Aged stucco is rarely one uniform color, though, so on some walls a patch will always be slightly visible. When that’s the case we’ll tell you up front and give you the option of a color coat from corner to corner, which gives a uniform finish.',
      },
      {
        q: 'Are hairline cracks a problem?',
        a: 'Fine hairline cracks are common in cement stucco and often cosmetic. Cracks that are wider, growing, stair-stepping or have one side sticking out past the other deserve a closer look, because they can let water in or point to movement.',
      },
    ],
    related: ['stucco-color-coat', 'stucco-water-damage-repair', 'restucco'],
    featuredAreas: ['albuquerque', 'rio-rancho', 'corrales', 'los-lunas', 'bernalillo'],
  },
  {
    slug: 'restucco',
    name: 'Re-Stucco & New Stucco',
    shortName: 'Re-Stucco & New Stucco',
    icon: 'home',
    cardBlurb:
      'Full re-stucco when the old stucco is failing, and new stucco for additions, garages and remodels.',
    seoTitle: 'Re-Stucco Albuquerque NM | Albuquerque Stucco',
    seoDescription:
      'Full re-stucco and new stucco for Albuquerque homes, additions and remodels. Traditional cement stucco and modern finishes. Free on-site estimate.',
    h1: 'Re-Stucco & New Stucco in Albuquerque',
    intro: [
      'Sometimes patching isn’t the right answer. When stucco is cracked all over, coming loose from the wall or hiding water damage, putting more patches on it just postpones the problem. A full re-stucco removes or covers the failing finish and gives the house a new, uniform exterior.',
      'We also apply new stucco on additions, casitas, garages and remodels, and blend it into the existing house so the new work doesn’t look added on. At the free on-site estimate we check the condition of the existing stucco and walk you through whether it can be recoated or needs to come off.',
    ],
    benefitsHeading: 'What a re-stucco does for your home',
    benefits: [
      { icon: 'shield', title: 'A sound exterior again', body: 'Failing, cracked stucco is replaced or properly covered, so the wall behind it is protected again.' },
      { icon: 'droplets', title: 'Water problems fixed at the source', body: 'A re-stucco is the time to correct flashing, weep screed and parapet details that let water in.' },
      { icon: 'palette', title: 'A new color if you want one', body: 'Keep your current color or choose a new one. The whole house ends up one even color.' },
      { icon: 'brick-wall', title: 'The texture you choose', body: 'Smooth, sand, light dash or a hand-troweled Santa Fe finish to suit Pueblo, Territorial or contemporary homes.' },
      { icon: 'home', title: 'Additions that blend in', body: 'New stucco on an addition or casita is textured and colored to match the main house.' },
      { icon: 'clock', title: 'A clear schedule', body: 'You get a written scope and expected timeline before we start, including how weather may affect it.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Assessment of whether existing stucco can be recoated or must be removed',
      'Removal and haul-off where required',
      'Lath, flashing and weep screed corrected where needed',
      'Scratch, brown and finish coats, or a recoat system over sound stucco',
      'Your choice of texture and color',
      'Window, door and landscaping protection, and cleanup',
    ],
    bestFor: [
      'Older homes with widespread cracking or loose stucco',
      'Homes with recurring water damage behind the stucco',
      'Additions, casitas, garages and remodels',
      'Homeowners ready for a full exterior refresh',
    ],
    local: {
      heading: 'Stucco and Albuquerque homes',
      paragraphs: [
        'Stucco is the standard exterior across the Albuquerque area, on everything from older Pueblo Revival and Territorial homes in the valley to the newer subdivisions on the West Side and in Rio Rancho. Many of those homes are now at the age where the original stucco has been through decades of sun, wind and freeze-thaw cycles.',
        'Flat roofs with parapets are common here, and the parapet is often where water gets into a wall. When we re-stucco, we pay close attention to the parapet caps, the canales and the transition between roof and wall.',
      ],
    },
    faqs: [
      {
        q: 'Do I need to tear off the old stucco?',
        a: 'Not always. If the existing stucco is well attached and the wall behind it is sound, it can often be repaired and recoated. If it’s loose, delaminating or hiding water damage, it needs to come off. We check this at the estimate and explain what we find.',
      },
      {
        q: 'How long does a re-stucco take?',
        a: 'It depends on the size of the house, whether old stucco is being removed and the weather, since each coat needs time to cure. You’ll get an expected timeline with your written estimate.',
      },
      {
        q: 'Do I need a permit to re-stucco?',
        a: 'Some re-stucco projects need a permit and some don’t, depending on the scope of work and where you live. We’ll tell you what applies to your project before work starts.',
      },
    ],
    related: ['stucco-color-coat', 'stucco-repair', 'stucco-water-damage-repair'],
    featuredAreas: ['albuquerque', 'rio-rancho', 'los-ranchos-de-albuquerque', 'placitas', 'corrales'],
  },
  {
    slug: 'stucco-color-coat',
    name: 'Stucco Color Coat & Recoat',
    shortName: 'Color Coat & Recoat',
    icon: 'paint-roller',
    cardBlurb:
      'A fresh finish coat over sound stucco to fix fading, chalking and patchy color, or to change the color of the house.',
    seoTitle: 'Stucco Color Coat Albuquerque | Albuquerque Stucco',
    seoDescription:
      'Stucco color coats and recoats in Albuquerque. Fix faded, chalky or patchy stucco, or change your home’s color. Cement and acrylic finishes. Free estimate.',
    h1: 'Stucco Color Coat & Recoat in Albuquerque',
    intro: [
      'The high-desert sun fades stucco. Over the years the color gets lighter and chalky, patches from old repairs stand out, and the house starts to look tired even though the stucco underneath is still solid.',
      'A color coat is a new finish layer applied over sound stucco. It gives the whole wall one even color and a fresh texture, without the cost and disruption of a full re-stucco. It’s also the cleanest way to change the color of your home.',
    ],
    benefitsHeading: 'Why homeowners choose a color coat',
    benefits: [
      { icon: 'palette', title: 'One even color', body: 'Old patches, faded walls and mismatched repairs disappear under a single, uniform finish.' },
      { icon: 'sun', title: 'Made for strong sun', body: 'We help you choose a finish suited to the intense UV here, including acrylic and elastomeric options that hold color well.' },
      { icon: 'brick-wall', title: 'Texture refreshed', body: 'Keep your existing texture or change it. A recoat can take a home from a heavy dash to a smoother, more modern finish.' },
      { icon: 'droplets', title: 'Hairline cracks covered', body: 'Many finish systems bridge fine hairline cracks and add a layer of weather resistance.' },
      { icon: 'home', title: 'Less disruption', body: 'No tear-off over sound stucco, so the job is faster and cleaner than a full re-stucco.' },
      { icon: 'sparkles', title: 'Curb appeal', body: 'A fresh color coat is one of the most visible changes you can make to a stucco home.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Color and texture samples to view on your own walls',
      'Crack repair and patching before the finish goes on',
      'Cleaning and surface preparation',
      'Finish coat in your chosen color and texture',
      'Protection of windows, trim and landscaping, and cleanup',
    ],
    bestFor: [
      'Faded, chalky or blotchy stucco',
      'Homes with many visible patches',
      'Changing the color of your home',
      'Getting a house ready to sell',
    ],
    local: {
      heading: 'Sun, dust and color in the high desert',
      paragraphs: [
        'At over a mile high, Albuquerque gets intense sunlight most days of the year. That sun breaks down color in the finish coat, so south- and west-facing walls often fade faster than the rest of the house.',
        'Dust and spring wind add to it, settling into texture and dulling the finish. A color coat resets all of that at once. If your neighborhood has an HOA, check its color guidelines first. We can bring samples for the review committee.',
      ],
    },
    faqs: [
      {
        q: 'Can you change the color of my stucco?',
        a: 'Yes. A color coat over sound stucco is the usual way to change a stucco home’s color. We bring samples so you can see colors on your own walls in daylight before you decide.',
      },
      {
        q: 'Is a color coat the same as painting stucco?',
        a: 'No. Paint is a thin film. A stucco color coat is a textured finish layer that becomes part of the wall. Some homes do get elastomeric coatings, which behave more like a heavy paint, and we’ll explain the trade-offs of each for your house.',
      },
      {
        q: 'Will a color coat fix cracks?',
        a: 'We repair cracks before the color coat goes on. Many finishes also bridge fine hairline cracks. A color coat won’t fix a crack caused by ongoing movement or water, so we look for those first.',
      },
    ],
    related: ['stucco-repair', 'restucco', 'stucco-garden-walls'],
    featuredAreas: ['albuquerque', 'rio-rancho', 'placitas', 'los-lunas', 'edgewood'],
  },
  {
    slug: 'stucco-water-damage-repair',
    name: 'Stucco Water Damage & Parapet Repair',
    shortName: 'Water Damage & Parapets',
    icon: 'cloud-rain',
    cardBlurb:
      'Bubbling, stained or soft stucco, leaking parapets and canales. We find where water is getting in and fix it.',
    seoTitle: 'Stucco Water Damage Repair Albuquerque | ABQ Stucco',
    seoDescription:
      'Stucco water damage, parapet and canale repair in Albuquerque. We trace where water gets in, repair the wall and seal it. Free on-site estimate.',
    h1: 'Stucco Water Damage & Parapet Repair in Albuquerque',
    intro: [
      'Water is the main enemy of stucco. When it gets behind the finish, through a cracked parapet cap, a leaking canale, a missing flashing or a sprinkler that hits the wall every morning, the stucco starts to stain, bubble, crumble or come loose. By the time it shows on the outside, the problem has usually been going on for a while.',
      'We start by finding where the water is coming from. Then we open up the damaged area, repair what’s underneath and rebuild the stucco so the same leak doesn’t happen again.',
    ],
    benefitsHeading: 'How we handle water damage',
    benefits: [
      { icon: 'search', title: 'Find the source', body: 'Parapet caps, canales, roof-to-wall transitions, window flashing, grade and sprinklers. We trace the water before we patch anything.' },
      { icon: 'building', title: 'Parapets and canales', body: 'Cracked parapet caps and leaking canales are some of the most common causes of wall damage on flat-roofed homes.' },
      { icon: 'layers', title: 'Damaged material removed', body: 'Wet, crumbling or delaminated stucco and rusted lath are cut out, not covered over.' },
      { icon: 'droplets', title: 'Rebuilt to shed water', body: 'Flashing, weep screed and drip edges are corrected so water runs off the wall instead of into it.' },
      { icon: 'snowflake', title: 'Ready for freeze-thaw', body: 'Sealed walls don’t hold the water that freezes and expands on cold winter nights.' },
      { icon: 'brick-wall', title: 'Finished to match', body: 'The repaired area is textured and color-blended into the rest of the wall.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Tracing the source of the water',
      'Removal of damaged stucco and lath',
      'Parapet cap and canale repair at the wall',
      'Flashing, weep screed and drip edge corrections',
      'Stucco rebuilt, textured and color-blended',
      'Cleanup and walkthrough',
    ],
    bestFor: [
      'Stains or streaks below parapets and canales',
      'Bubbling, soft or crumbling stucco',
      'Stucco damaged at the base of the wall',
      'Walls hit by sprinklers or sitting against soil',
    ],
    local: {
      heading: 'Monsoon season and flat roofs',
      paragraphs: [
        'Albuquerque is dry most of the year, which is exactly why water damage gets missed. Then the monsoon arrives in mid to late summer, and short, heavy storms dump water on roofs and walls. Flat roofs drain through canales and scuppers, and any crack at a parapet or canale sends that water straight into the wall.',
        'Winter adds a second problem: water that soaked into a wall can freeze overnight. Each freeze-thaw cycle widens cracks a little more. Catching water damage early keeps a repair small.',
      ],
    },
    faqs: [
      {
        q: 'What are the signs of water damage behind stucco?',
        a: 'Common signs include dark stains or streaks below parapets, canales or windows, bubbling or blistering, stucco that sounds hollow or feels soft, efflorescence (a white, chalky residue) and cracks that keep coming back. Indoors, look for stains on the wall or ceiling near exterior walls.',
      },
      {
        q: 'Do you repair roofs?',
        a: 'We repair the stucco side of parapets and canales: caps, the wall surfaces and the transitions where stucco meets the roof. If the roofing membrane itself needs work, we’ll tell you so you can have it handled before we finish the wall.',
      },
      {
        q: 'My sprinklers hit the wall. Is that a problem?',
        a: 'It can be. Stucco that gets wet every day, especially near the ground, can stain, deteriorate and wick water into the wall. Adjusting the sprinkler heads is often the cheapest fix there is. We’ll point it out if we see it.',
      },
    ],
    related: ['stucco-repair', 'restucco', 'eifs-synthetic-stucco-repair'],
    featuredAreas: ['albuquerque', 'corrales', 'los-ranchos-de-albuquerque', 'bernalillo', 'tijeras'],
  },
  {
    slug: 'eifs-synthetic-stucco-repair',
    name: 'EIFS & Synthetic Stucco Repair',
    shortName: 'EIFS & Synthetic Stucco',
    icon: 'layers',
    cardBlurb:
      'Repairs to synthetic stucco (EIFS): dents, holes, hail damage, cracked base coat and failed sealant joints.',
    seoTitle: 'EIFS Synthetic Stucco Repair Albuquerque | ABQ Stucco',
    seoDescription:
      'EIFS and synthetic stucco repair in Albuquerque. Dents, holes, hail damage and sealant joints repaired with matching texture and color. Free estimate.',
    h1: 'EIFS & Synthetic Stucco Repair in Albuquerque',
    intro: [
      'Synthetic stucco, also called EIFS (exterior insulation and finish system), looks a lot like traditional stucco but is built differently: foam insulation board, a base coat with reinforcing mesh, and an acrylic finish coat. It insulates well, but it’s softer than cement stucco and needs to be repaired with compatible materials.',
      'We repair dents, holes, hail damage, cracked base coat and failed sealant joints around windows and penetrations. Not sure which kind of stucco you have? We can tell at the estimate.',
    ],
    benefitsHeading: 'What we repair on synthetic stucco',
    benefits: [
      { icon: 'hammer', title: 'Impact and hail damage', body: 'Dents and punctures from hail, balls and equipment are cut out and rebuilt with matching foam, mesh and finish.' },
      { icon: 'layers', title: 'Compatible materials', body: 'EIFS gets repaired with EIFS materials. Cement patches on synthetic stucco crack and fail.' },
      { icon: 'droplets', title: 'Sealant joints', body: 'Failed sealant around windows, doors and penetrations is one of the main ways water gets behind EIFS. We replace it.' },
      { icon: 'search', title: 'Checked for moisture', body: 'Where damage suggests water got in, we open the area and check the substrate before closing it up.' },
      { icon: 'palette', title: 'Matched finish', body: 'Acrylic finishes are matched for texture and color so the repair blends in.' },
      { icon: 'building', title: 'Homes and commercial buildings', body: 'EIFS is common on commercial buildings as well as homes. We work on both.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Identification of EIFS versus traditional stucco',
      'Removal of damaged foam, mesh and finish',
      'Substrate check where moisture is suspected',
      'Rebuild with compatible base coat, mesh and finish',
      'Sealant joint replacement',
      'Texture and color matching, and cleanup',
    ],
    bestFor: [
      'Hail dents and impact holes',
      'Cracks in synthetic stucco',
      'Failed caulk around windows and doors',
      'Commercial buildings with EIFS exteriors',
    ],
    local: {
      heading: 'Synthetic stucco in Albuquerque',
      paragraphs: [
        'You’ll find synthetic stucco across the Albuquerque area, on newer homes and on many commercial buildings. It handles the dry climate well when it’s intact, but it relies on its finish and sealant joints to keep water out.',
        'Hail is the most common cause of damage we see on EIFS here, along with the sealant joints around windows drying out in the strong sun. Both are very repairable when they’re caught early.',
      ],
    },
    faqs: [
      {
        q: 'How do I know if I have EIFS or traditional stucco?',
        a: 'Tap the wall. Traditional cement stucco sounds and feels hard and solid. EIFS sounds more hollow and gives slightly when pressed, because there’s foam underneath. The easiest way to be sure is to have us look at it during the free estimate.',
      },
      {
        q: 'Can you patch EIFS with regular stucco?',
        a: 'It’s not a good idea. Cement stucco and EIFS move differently, and a cement patch on synthetic stucco tends to crack around its edges. We repair EIFS with compatible materials.',
      },
      {
        q: 'Do you work on commercial buildings?',
        a: 'Yes. Call or send a request with the address and a description of the damage, and we’ll set up a time to look at it.',
      },
    ],
    related: ['stucco-repair', 'stucco-water-damage-repair', 'stucco-color-coat'],
    featuredAreas: ['albuquerque', 'rio-rancho', 'bernalillo', 'los-lunas', 'belen'],
  },
  {
    slug: 'stucco-garden-walls',
    name: 'Stucco Garden Walls & Fences',
    shortName: 'Garden Walls & Fences',
    icon: 'fence',
    cardBlurb:
      'Stucco for new and existing block walls, courtyard walls and fences, plus repairs to cracked or crumbling wall stucco.',
    seoTitle: 'Stucco Garden Walls Albuquerque | Albuquerque Stucco',
    seoDescription:
      'Stucco for garden walls, courtyard walls and block fences in Albuquerque. New stucco, color coats and crack repair to match your home. Free estimate.',
    h1: 'Stucco Garden Walls & Block Fences in Albuquerque',
    intro: [
      'Block walls are everywhere in Albuquerque: around backyards, along property lines and framing front courtyards. Bare block looks unfinished, and stucco that’s cracked or peeling off a wall makes the whole property look neglected.',
      'We stucco new and existing block walls, repair cracked and crumbling wall stucco, and recoat walls so they match the house. Garden walls take more weather than the house does, with both faces exposed and a top that catches rain and snow, so we pay close attention to the caps.',
    ],
    benefitsHeading: 'What stucco does for a garden wall',
    benefits: [
      { icon: 'home', title: 'Matches the house', body: 'Walls finished in the same color and texture as your home make the property look like one design.' },
      { icon: 'shield', title: 'Protects the block', body: 'A stucco finish and a sound cap keep water out of the wall and the mortar joints.' },
      { icon: 'brick-wall', title: 'Caps that shed water', body: 'Rounded or sloped caps are built to shed water instead of letting it sit on top of the wall.' },
      { icon: 'wrench', title: 'Repairs that last', body: 'Cracked and crumbling wall stucco is removed and rebuilt, not just covered over.' },
      { icon: 'palette', title: 'Color coats', body: 'Faded or patchy walls can get a fresh color coat to match a newly coated house.' },
      { icon: 'leaf', title: 'Landscaping protected', body: 'We protect plants, gravel and irrigation along the wall while we work.' },
    ],
    included: [
      'Free on-site inspection and written estimate',
      'Stucco on new or existing CMU block walls',
      'Wall caps rebuilt or reshaped to shed water',
      'Crack and damage repair',
      'Color and texture matched to your home',
      'Protection of landscaping and cleanup',
    ],
    bestFor: [
      'New block walls that need a finish',
      'Courtyard and entry walls',
      'Cracked, peeling or crumbling wall stucco',
      'Walls that should match a newly stuccoed house',
    ],
    local: {
      heading: 'Walls that face the weather on both sides',
      paragraphs: [
        'A garden wall gets sun on both faces, rain and snow on its cap, and sprinkler spray and soil against its base. That’s more exposure than most house walls, which is why wall stucco often fails first.',
        'Cracks that line up with the block joints or run diagonally from the top are common. Some are cosmetic. Others come from the wall moving with the soil. We’ll tell you which you have before we recommend a repair.',
      ],
    },
    faqs: [
      {
        q: 'Can you stucco an existing bare block wall?',
        a: 'Yes. Block walls are a common base for stucco. We check that the wall is solid and clean, then apply the stucco and finish it to match your home.',
      },
      {
        q: 'Why is the stucco on my wall crumbling at the bottom?',
        a: 'Usually water. Sprinklers, soil piled against the wall and poor drainage keep the base of the wall wet, and the stucco breaks down over time. We repair the stucco and point out what’s keeping it wet so it doesn’t happen again.',
      },
      {
        q: 'Do you build block walls?',
        a: 'We focus on the stucco. If you need a new wall built, have it built first and we can stucco it once it’s ready.',
      },
    ],
    related: ['stucco-color-coat', 'stucco-repair', 'restucco'],
    featuredAreas: ['albuquerque', 'rio-rancho', 'los-lunas', 'bosque-farms', 'sandia-park'],
  },
];

export const serviceBySlug = (slug: string) => {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service slug: ${slug}`);
  return s;
};
