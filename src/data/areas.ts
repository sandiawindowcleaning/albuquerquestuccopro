import type { Area } from './types';

// Each city page has its own copy. Don't template these: the point is that
// every page says something true and specific about that place. Only name
// real communities, and never invent local statistics.

export const AREAS: Area[] = [
  {
    slug: 'albuquerque',
    name: 'Albuquerque',
    kind: 'City',
    county: 'Bernalillo County',
    wikipedia: 'https://en.wikipedia.org/wiki/Albuquerque,_New_Mexico',
    seoTitle: 'Stucco Contractor in Albuquerque, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, re-stucco, color coats and water damage repair across Albuquerque, from the Northeast Heights to the West Side. Free on-site estimate.',
    h1: 'Stucco Repair & Re-Stucco in Albuquerque, NM',
    intro: [
      'Albuquerque is home base for Albuquerque Stucco, and it’s a city built on stucco. From older Pueblo Revival and Territorial homes near Old Town and in the valley to the ranch homes of the Northeast Heights and the newer subdivisions on the West Side, almost every house in town has a stucco exterior.',
      'Whether you’re in Nob Hill, the North Valley, the South Valley, Uptown, Four Hills or anywhere in between, we’re close by.',
    ],
    sections: [
      {
        heading: 'Different parts of town, different stucco problems',
        paragraphs: [
          'Homes in the valley near the Rio Grande tend to be older, and many have traditional cement stucco, flat roofs, parapets and canales. That’s where we see a lot of water damage at parapets and at the base of walls. Up in the Northeast Heights and Foothills, homes face more wind and more sun, and fading and cracking are the usual complaints.',
          'On the West Side, much of the housing is newer, but newer doesn’t mean trouble-free. Cracks around windows, settlement cracks and faded color coats are common there too.',
        ],
      },
      {
        heading: 'Historic areas and design review',
        paragraphs: [
          'Some parts of Albuquerque, including Old Town and other historic zones, have design guidelines that cover exterior changes such as color and finish. If your home is in a historic area or an HOA, check what review applies before changing your stucco color.',
          'We can provide color samples and product details for the application.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-repair', why: 'For the cracks around windows, doors and corners that show up all over town.' },
      { service: 'stucco-water-damage-repair', why: 'For flat-roofed valley homes with parapets and canales.' },
      { service: 'stucco-color-coat', why: 'For Heights and West Side homes faded by years of sun.' },
    ],
    faqs: [
      {
        q: 'Where is Albuquerque Stucco based?',
        a: 'We’re based in Albuquerque and work across the metro area, including Rio Rancho, Corrales, the East Mountains and Valencia County.',
      },
      {
        q: 'What’s the best time of year for stucco work in Albuquerque?',
        a: 'Spring and fall are ideal, but stucco work can be done for much of the year. Stucco needs to cure properly, so we plan around freezing nights in winter and protect fresh work from extreme heat and monsoon storms in summer.',
      },
    ],
    nearby: ['rio-rancho', 'los-ranchos-de-albuquerque', 'corrales', 'tijeras'],
  },
  {
    slug: 'rio-rancho',
    name: 'Rio Rancho',
    kind: 'City',
    county: 'Sandoval County',
    wikipedia: 'https://en.wikipedia.org/wiki/Rio_Rancho,_New_Mexico',
    seoTitle: 'Stucco Repair in Rio Rancho, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, color coats and re-stucco for Rio Rancho homes. Cracks, fading and wind damage fixed and matched to your house. Free on-site estimate.',
    h1: 'Stucco Repair & Color Coats in Rio Rancho, NM',
    intro: [
      'Rio Rancho has grown fast over the past few decades, and nearly all of it is stucco: subdivision after subdivision of stucco homes, garden walls and HOA-maintained common areas, spread across the mesa northwest of Albuquerque.',
      'A lot of those homes are now old enough that their original color coat has faded and the first round of cracks has appeared. That’s most of what we do in Rio Rancho.',
    ],
    sections: [
      {
        heading: 'Wind and sun on the mesa',
        paragraphs: [
          'Rio Rancho sits up on open, high ground, and it gets a lot of wind, especially in spring. Wind-driven sand and dust wear at the finish, and walls with no shade get the full force of the afternoon sun. That combination fades color coats faster than in more sheltered parts of the metro.',
          'If your house looks patchy or chalky but the stucco is still solid, a color coat usually makes more sense than a full re-stucco.',
        ],
      },
      {
        heading: 'HOA color guidelines',
        paragraphs: [
          'Many Rio Rancho neighborhoods have HOAs with approved color palettes. Before you change your stucco color, check your association’s guidelines and whether you need approval.',
          'We can bring samples and provide finish details for your application.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-color-coat', why: 'For faded, chalky color coats on sun-exposed walls.' },
      { service: 'stucco-repair', why: 'For cracks at window corners and settlement cracks in newer homes.' },
      { service: 'stucco-garden-walls', why: 'For the block walls that line most Rio Rancho backyards.' },
    ],
    faqs: [
      {
        q: 'My Rio Rancho house is only 15 or 20 years old. Why is the stucco cracking?',
        a: 'Some cracking is normal as a house settles and as stucco expands and contracts with the temperature. Cracks around window and door corners are especially common. Wider or growing cracks deserve a look, because they can point to movement or let water in.',
      },
      {
        q: 'Can I pick any color for a color coat?',
        a: 'Stucco comes in a wide range of colors, but if you have an HOA, its approved palette comes first. We’ll help you narrow choices down within those guidelines.',
      },
    ],
    nearby: ['albuquerque', 'corrales', 'bernalillo', 'placitas'],
  },
  {
    slug: 'corrales',
    name: 'Corrales',
    kind: 'City',
    county: 'Sandoval County',
    wikipedia: 'https://en.wikipedia.org/wiki/Corrales,_New_Mexico',
    seoTitle: 'Stucco Repair in Corrales, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco and adobe-style home repair in Corrales, NM. Parapets, canales, water damage, color coats and garden walls. Free on-site estimate.',
    h1: 'Stucco Repair in Corrales, NM',
    intro: [
      'Corrales has kept its rural feel: irrigation ditches, horse properties, cottonwoods along the bosque and homes set back on large lots. Many of those homes are Pueblo-style or Territorial, with thick walls, flat roofs, parapets and canales, and some are true adobe.',
      'Those homes are beautiful, and they need stucco work done with care. Matching texture on a hand-troweled wall and handling water at parapets are a big part of what we do here.',
    ],
    sections: [
      {
        heading: 'Parapets, canales and flat roofs',
        paragraphs: [
          'On flat-roofed homes, the parapet is the most exposed part of the wall. Cracked parapet caps and leaking canales let water straight into the top of the wall, and the damage often shows up as stains and bubbling further down.',
          'We repair the stucco at parapets and canales, correct the details that send water into the wall, and blend the repair into the rest of the house.',
        ],
      },
      {
        heading: 'Older homes and adobe walls',
        paragraphs: [
          'Adobe and older masonry walls need to breathe, and the wrong patch material can trap moisture. Before we repair an older home, we look at how the wall was built and what’s already on it.',
          'If your home has a mix of old and newer additions, we’ll match the texture on both so the house reads as one.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-water-damage-repair', why: 'For parapets and canales on flat-roofed Pueblo-style homes.' },
      { service: 'stucco-repair', why: 'For hand-troweled finishes that need careful texture matching.' },
      { service: 'stucco-garden-walls', why: 'For courtyard and property walls on larger lots.' },
    ],
    faqs: [
      {
        q: 'Can you repair stucco on an adobe house?',
        a: 'Yes, with the right approach. Adobe walls need compatible materials that let moisture escape. We look at the wall and any previous repairs first, then explain how we’d repair it.',
      },
      {
        q: 'Can you match a hand-troweled Santa Fe finish?',
        a: 'Yes. Hand-troweled finishes vary from house to house, so we look closely at the existing wall and match the texture by hand.',
      },
    ],
    nearby: ['rio-rancho', 'los-ranchos-de-albuquerque', 'albuquerque', 'bernalillo'],
  },
  {
    slug: 'los-ranchos-de-albuquerque',
    name: 'Los Ranchos de Albuquerque',
    kind: 'City',
    county: 'Bernalillo County',
    wikipedia: 'https://en.wikipedia.org/wiki/Los_Ranchos_de_Albuquerque,_New_Mexico',
    seoTitle: 'Stucco Repair in Los Ranchos, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, re-stucco and water damage repair for Los Ranchos de Albuquerque homes. Matched textures and colors. Free on-site estimate.',
    h1: 'Stucco Repair in Los Ranchos de Albuquerque',
    intro: [
      'Los Ranchos de Albuquerque is a village in the North Valley, with irrigated fields, acequias and homes on larger lots between Albuquerque and the Rio Grande. It has a mix of older adobe and Territorial homes, custom Pueblo-style houses and newer builds.',
      'Many of those homes have traditional stucco and flat roofs, and plenty have had additions and repairs over the years that no longer match.',
    ],
    sections: [
      {
        heading: 'Irrigation, high water tables and wall bases',
        paragraphs: [
          'With fields, ditches and lawns all around, the ground near homes in the valley can stay damp. Stucco at the base of the wall picks up that moisture, and you can see it as staining, white efflorescence and stucco breaking down near the ground.',
          'We repair the damaged stucco, check the weep screed and point out grading or irrigation that keeps the wall wet.',
        ],
      },
      {
        heading: 'Making additions match',
        paragraphs: [
          'Over time, many valley homes have gained additions, casitas and garages, each stuccoed at a different time with a slightly different texture or color. A color coat across the whole house, after repairs, ties it all together.',
          'We’ll bring texture and color samples to the estimate so you can compare them on your own walls.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-water-damage-repair', why: 'For wall bases kept damp by irrigation and valley soil.' },
      { service: 'restucco', why: 'For older homes with widespread cracking or loose stucco.' },
      { service: 'stucco-color-coat', why: 'To bring additions and the main house to one color.' },
    ],
    faqs: [
      {
        q: 'What is the white residue on my stucco?',
        a: 'It’s usually efflorescence: salts carried to the surface by water moving through the wall. It’s a sign that the wall is getting wet, often from the ground or from irrigation. We repair the stucco and look for the moisture source.',
      },
      {
        q: 'Do you work on Territorial-style homes?',
        a: 'Yes. Territorial homes often have brick coping on the parapets and specific trim details. We work around those details and keep the character of the house.',
      },
    ],
    nearby: ['albuquerque', 'corrales', 'bernalillo', 'rio-rancho'],
  },
  {
    slug: 'bernalillo',
    name: 'Bernalillo',
    kind: 'City',
    county: 'Sandoval County',
    wikipedia: 'https://en.wikipedia.org/wiki/Bernalillo,_New_Mexico',
    seoTitle: 'Stucco Repair in Bernalillo, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, re-stucco and color coats in the Town of Bernalillo, NM. Older homes, flat roofs and commercial buildings. Free on-site estimate.',
    h1: 'Stucco Repair & Re-Stucco in Bernalillo, NM',
    intro: [
      'The Town of Bernalillo sits along the Rio Grande just north of the metro, and it’s one of the oldest communities in the area. Its mix of historic homes, newer neighborhoods and small commercial buildings along Camino del Pueblo is almost entirely stucco.',
      'We work on homes and businesses in Bernalillo, from small crack repairs to full re-stucco jobs.',
    ],
    sections: [
      {
        heading: 'Older homes, layered repairs',
        paragraphs: [
          'Older homes in Bernalillo have often been patched many times, sometimes with materials that don’t suit the wall underneath. The result is a wall with different textures, colors and cracks around every old patch.',
          'When that’s the case, we look at whether the stucco is still well attached. If it is, repairs and a color coat can give the house a uniform finish. If it isn’t, a re-stucco is the longer-lasting fix.',
        ],
      },
      {
        heading: 'Commercial stucco',
        paragraphs: [
          'Storefronts and small commercial buildings take a beating from traffic, sun and wind. We repair and recoat both traditional and synthetic stucco on commercial buildings.',
          'Call or send a request with the property address, and we’ll set up a time to look at it.',
        ],
      },
    ],
    focus: [
      { service: 'restucco', why: 'For older homes with years of mismatched patches.' },
      { service: 'eifs-synthetic-stucco-repair', why: 'For commercial buildings with synthetic stucco.' },
      { service: 'stucco-water-damage-repair', why: 'For flat roofs, parapets and canales.' },
    ],
    faqs: [
      {
        q: 'Do you work on commercial buildings in Bernalillo?',
        a: 'Yes. We repair and recoat stucco and synthetic stucco on commercial buildings as well as homes.',
      },
      {
        q: 'My house has patches of different colors. Can that be fixed?',
        a: 'Usually, yes. After any needed repairs, a color coat over the whole wall, or the whole house, gives it one even color and texture.',
      },
    ],
    nearby: ['placitas', 'rio-rancho', 'corrales', 'los-ranchos-de-albuquerque'],
  },
  {
    slug: 'placitas',
    name: 'Placitas',
    kind: 'Place',
    county: 'Sandoval County',
    wikipedia: 'https://en.wikipedia.org/wiki/Placitas,_Sandoval_County,_New_Mexico',
    seoTitle: 'Stucco Repair in Placitas, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, color coats and re-stucco for Placitas homes in the Sandia foothills. Custom homes, parapets and garden walls. Free on-site estimate.',
    h1: 'Stucco Repair & Color Coats in Placitas, NM',
    intro: [
      'Placitas sits in the foothills at the north end of the Sandia Mountains, with custom homes spread out across rolling, piñon-dotted land and long views toward the Rio Grande valley. Most homes here are Pueblo-style or contemporary Southwestern, almost all of them stucco.',
      'Homes in Placitas tend to be custom, with hand-troweled finishes, deep parapets and plenty of exposed walls, so careful repair and matching matter.',
    ],
    sections: [
      {
        heading: 'Exposed walls and big views',
        paragraphs: [
          'The same open setting that gives Placitas homes their views also exposes their walls to wind, sun and weather from every direction. Stucco on exposed elevations fades and cracks faster, and parapets catch the worst of it.',
          'We often recommend repairing the damaged areas, then applying a color coat to the most exposed walls, or the whole house, so the finish ends up even.',
        ],
      },
      {
        heading: 'HOAs and design guidelines',
        paragraphs: [
          'Some Placitas neighborhoods have HOAs with color and design guidelines meant to keep homes blending into the landscape. Check your guidelines before changing color.',
          'We can bring earth-tone samples and provide finish details for the review.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-color-coat', why: 'For sun- and wind-exposed walls that have faded unevenly.' },
      { service: 'stucco-repair', why: 'For hand-troweled custom finishes that need careful matching.' },
      { service: 'stucco-water-damage-repair', why: 'For deep parapets and canales on Pueblo-style homes.' },
    ],
    faqs: [
      {
        q: 'Do you travel to Placitas?',
        a: 'Yes. Placitas is part of our regular service area, along with Bernalillo and the rest of Sandoval County near the metro.',
      },
      {
        q: 'Can you match a custom hand-troweled finish?',
        a: 'Yes. We match texture by hand, looking closely at the existing wall, and we’ll show you a sample area if you want to see it before we do the whole repair.',
      },
    ],
    nearby: ['bernalillo', 'sandia-park', 'rio-rancho', 'albuquerque'],
  },
  {
    slug: 'los-lunas',
    name: 'Los Lunas',
    kind: 'City',
    county: 'Valencia County',
    wikipedia: 'https://en.wikipedia.org/wiki/Los_Lunas,_New_Mexico',
    seoTitle: 'Stucco Repair in Los Lunas, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, color coats and garden walls in Los Lunas, NM. Crack repair, water damage and full re-stucco for Valencia County homes. Free estimate.',
    h1: 'Stucco Repair in Los Lunas, NM',
    intro: [
      'Los Lunas, the Valencia County seat, sits along the Rio Grande south of Albuquerque and has grown steadily, with newer subdivisions alongside older homes near the river and in the village’s historic core.',
      'We work across Los Lunas on everything from crack repairs on newer homes to full re-stucco jobs on older ones.',
    ],
    sections: [
      {
        heading: 'Newer subdivisions',
        paragraphs: [
          'Many of the newer homes in Los Lunas have stucco that’s reaching the age where the first color coat is fading and cracks are showing around windows and doors. Catching those cracks now keeps water out of the wall.',
          'A crack repair followed by a color coat can make a house look new again without a full re-stucco.',
        ],
      },
      {
        heading: 'Older homes near the river',
        paragraphs: [
          'Closer to the Rio Grande, older homes tend to have traditional stucco, flat roofs and walls that sit near damp ground. Water damage at parapets and at the base of walls is common.',
          'We repair the stucco and look for whatever is keeping the wall wet.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-repair', why: 'For cracks around windows and doors on newer homes.' },
      { service: 'stucco-color-coat', why: 'For faded first color coats.' },
      { service: 'stucco-garden-walls', why: 'For backyard and property walls.' },
    ],
    faqs: [
      {
        q: 'Do you serve Los Lunas and the rest of Valencia County?',
        a: 'Yes. We work in Los Lunas, Bosque Farms, Belen and the surrounding areas of Valencia County.',
      },
      {
        q: 'Should I fix small cracks now or wait until I re-stucco?',
        a: 'Fix them now. Small cracks let water into the wall, and in winter that water freezes and widens the crack. Small repairs are much cheaper than repairing water damage later.',
      },
    ],
    nearby: ['bosque-farms', 'belen', 'albuquerque', 'edgewood'],
  },
  {
    slug: 'bosque-farms',
    name: 'Bosque Farms',
    kind: 'City',
    county: 'Valencia County',
    wikipedia: 'https://en.wikipedia.org/wiki/Bosque_Farms,_New_Mexico',
    seoTitle: 'Stucco Repair in Bosque Farms, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, garden walls and color coats in Bosque Farms, NM. Homes, outbuildings and property walls on rural lots. Free on-site estimate.',
    h1: 'Stucco Repair in Bosque Farms, NM',
    intro: [
      'Bosque Farms is a small village in Valencia County, between Albuquerque and Los Lunas, with homes on larger lots, irrigated pasture and plenty of horses. Properties here often have more than one stucco structure: the house, a casita, a garage or workshop and long property walls.',
      'We repair and recoat all of them, so the whole property matches.',
    ],
    sections: [
      {
        heading: 'Irrigation and wall bases',
        paragraphs: [
          'Irrigated pasture and lawns keep the ground near buildings damp for part of the year. Stucco near the ground can stain, crumble and pull away when it stays wet.',
          'We repair the damage and show you where drainage or irrigation changes would help.',
        ],
      },
      {
        heading: 'More than one building',
        paragraphs: [
          'When a house, casita and garage were stuccoed at different times, they rarely match. A color coat across all of them after any repairs gives the property one consistent look.',
          'We can quote each building separately so you can decide what to do now and what to do later.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-water-damage-repair', why: 'For wall bases near irrigated land.' },
      { service: 'stucco-color-coat', why: 'To bring the house and outbuildings to one color.' },
      { service: 'stucco-garden-walls', why: 'For long property and courtyard walls.' },
    ],
    faqs: [
      {
        q: 'Can you stucco a garage or workshop to match my house?',
        a: 'Yes. We match the texture and color of the house so the outbuilding looks like part of the same property.',
      },
      {
        q: 'Can you quote buildings separately?',
        a: 'Yes. Your written estimate can list each building or wall separately, so you can choose what to do first.',
      },
    ],
    nearby: ['los-lunas', 'belen', 'albuquerque', 'edgewood'],
  },
  {
    slug: 'belen',
    name: 'Belen',
    kind: 'City',
    county: 'Valencia County',
    wikipedia: 'https://en.wikipedia.org/wiki/Belen,_New_Mexico',
    seoTitle: 'Stucco Repair in Belen, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, re-stucco and color coats for homes and businesses in Belen, NM. Older homes, flat roofs and commercial stucco. Free on-site estimate.',
    h1: 'Stucco Repair & Re-Stucco in Belen, NM',
    intro: [
      'Belen, known as the Hub City for its long history as a railroad town, has a large stock of older homes and downtown buildings, plus newer neighborhoods on the edges of town. Much of it is stucco.',
      'Older stucco that has been patched many times, flat roofs with parapets, and faded color coats are the most common jobs we see in Belen.',
    ],
    sections: [
      {
        heading: 'Older homes and downtown buildings',
        paragraphs: [
          'Many of Belen’s older buildings have traditional stucco that has been patched, painted or coated over the years. When different materials have been layered on the same wall, they can crack and peel at the edges of each repair.',
          'We check how well the existing stucco is holding before recommending repairs and a recoat, or a full re-stucco.',
        ],
      },
      {
        heading: 'Painted stucco',
        paragraphs: [
          'Some stucco in older towns has been painted. Paint on stucco can trap moisture and peel, and it changes what can go on top of it.',
          'If your stucco has been painted, tell us when you call. We’ll explain the options for getting back to a durable stucco finish.',
        ],
      },
    ],
    focus: [
      { service: 'restucco', why: 'For older buildings with layered, failing repairs.' },
      { service: 'stucco-water-damage-repair', why: 'For flat roofs with parapets and canales.' },
      { service: 'stucco-color-coat', why: 'For faded homes that are still structurally sound.' },
    ],
    faqs: [
      {
        q: 'Can you put stucco over painted stucco?',
        a: 'It depends on the condition of the paint. Paint that’s peeling or chalky usually has to be removed or treated first so the new finish bonds. We look at the wall and explain the options.',
      },
      {
        q: 'Do you work on commercial buildings in Belen?',
        a: 'Yes. We repair and recoat stucco on storefronts and commercial buildings.',
      },
    ],
    nearby: ['los-lunas', 'bosque-farms', 'albuquerque', 'edgewood'],
  },
  {
    slug: 'tijeras',
    name: 'Tijeras',
    kind: 'City',
    county: 'Bernalillo County',
    wikipedia: 'https://en.wikipedia.org/wiki/Tijeras,_New_Mexico',
    seoTitle: 'Stucco Repair in Tijeras, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair for East Mountain homes in and around Tijeras, NM. Freeze-thaw cracks, snow and water damage, color coats. Free on-site estimate.',
    h1: 'Stucco Repair in Tijeras & the East Mountains',
    intro: [
      'Tijeras sits in Tijeras Canyon between the Sandia and Manzanita Mountains, the gateway to the East Mountains. It’s higher than Albuquerque, and that elevation means colder winters, more snow and more freeze-thaw cycles.',
      'Homes here are a mix of stucco, wood and log, often on wooded, sloped lots. The stucco on them works harder than stucco in town.',
    ],
    sections: [
      {
        heading: 'Freeze-thaw and snow',
        paragraphs: [
          'Snow that sits against a wall or on a parapet melts during the day and soaks into any crack. At night it freezes and expands. Repeat that through a mountain winter and small cracks become big ones, and stucco near the ground can start breaking down.',
          'Sealing cracks before winter is the best defense. When damage is already there, we repair it and correct whatever is letting snowmelt sit against the wall.',
        ],
      },
      {
        heading: 'Scheduling around mountain weather',
        paragraphs: [
          'Stucco needs time to cure without freezing, so mountain jobs need more careful scheduling than jobs in town. Late spring through early fall is the most reliable window.',
          'We’ll give you a realistic timeline with your estimate and plan the work around the weather.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-water-damage-repair', why: 'For snowmelt and freeze-thaw damage.' },
      { service: 'stucco-repair', why: 'For cracks that widen through mountain winters.' },
      { service: 'restucco', why: 'For older East Mountain homes with failing stucco.' },
    ],
    faqs: [
      {
        q: 'Can you do stucco work in the winter in the East Mountains?',
        a: 'Small repairs can sometimes be done on mild days, but stucco must not freeze while it cures. Larger jobs are best scheduled from late spring to early fall, and we’ll plan with that in mind.',
      },
      {
        q: 'Do you serve the whole East Mountain area?',
        a: 'Yes. We work in Tijeras, Cedar Crest, Sandia Park, Edgewood and the surrounding East Mountain communities.',
      },
    ],
    nearby: ['sandia-park', 'edgewood', 'albuquerque', 'placitas'],
  },
  {
    slug: 'sandia-park',
    name: 'Sandia Park',
    kind: 'Place',
    county: 'Bernalillo County',
    wikipedia: 'https://en.wikipedia.org/wiki/Sandia_Park,_New_Mexico',
    seoTitle: 'Stucco Repair in Sandia Park, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, color coats and re-stucco for Sandia Park and Cedar Crest homes. Freeze-thaw cracks, snowmelt and sun damage. Free on-site estimate.',
    h1: 'Stucco Repair in Sandia Park & Cedar Crest',
    intro: [
      'Sandia Park and neighboring Cedar Crest sit on the east side of the Sandia Mountains along NM 14, with homes tucked into piñon, juniper and ponderosa forest. Winters are colder and snowier than in Albuquerque, and summer sun at this elevation is intense.',
      'That combination is hard on stucco. Freeze-thaw cracking and fading on sun-facing walls are the most common problems we see here.',
    ],
    sections: [
      {
        heading: 'Shade on one side, sun on the other',
        paragraphs: [
          'On wooded lots, north-facing walls can stay shaded and damp, holding snow against the base of the wall for days. South- and west-facing walls get full sun and fade. The same house can have water damage on one side and sun damage on the other.',
          'We look at every side of the house and recommend the right fix for each.',
        ],
      },
      {
        heading: 'Wildfire-conscious maintenance',
        paragraphs: [
          'Stucco is a non-combustible siding, which matters in forested areas. Keeping it intact, with cracks sealed and no gaps at eaves and penetrations, helps it do its job.',
          'If you’re working through wildfire preparation for your property, sound stucco is part of the picture.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-repair', why: 'For freeze-thaw cracks on mountain homes.' },
      { service: 'stucco-water-damage-repair', why: 'For shaded walls where snow sits against the stucco.' },
      { service: 'stucco-color-coat', why: 'For sun-faded south and west walls.' },
    ],
    faqs: [
      {
        q: 'Why is stucco crumbling at the bottom of my north wall?',
        a: 'Shaded walls hold snow and moisture longer, and the base of the wall stays wet through repeated freezes and thaws. Over time the stucco breaks down. We repair it and look at drainage and grading so it stays drier.',
      },
      {
        q: 'Is stucco fire-resistant?',
        a: 'Cement stucco is non-combustible, which is one reason it’s popular in forested areas. Keeping it in good repair, with no cracks or gaps, helps it perform as intended.',
      },
    ],
    nearby: ['tijeras', 'edgewood', 'placitas', 'albuquerque'],
  },
  {
    slug: 'edgewood',
    name: 'Edgewood',
    kind: 'City',
    county: 'Santa Fe County',
    wikipedia: 'https://en.wikipedia.org/wiki/Edgewood,_New_Mexico',
    seoTitle: 'Stucco Repair in Edgewood, NM | Albuquerque Stucco',
    seoDescription:
      'Stucco repair, color coats and garden walls for Edgewood, NM homes east of the Sandias. Wind, sun and freeze-thaw damage repaired. Free estimate.',
    h1: 'Stucco Repair in Edgewood, NM',
    intro: [
      'Edgewood sits on the open high plains east of the Sandia and Manzano Mountains, with homes on larger lots, wide views and not much between your walls and the weather. Wind, strong sun and cold winter nights all take a toll on stucco out here.',
      'We repair, recoat and re-stucco homes, outbuildings and walls in and around Edgewood.',
    ],
    sections: [
      {
        heading: 'Wind-exposed homes',
        paragraphs: [
          'Open land means wind, and wind carries grit that wears down the finish on the walls it hits most. Combined with high-elevation sun, that leaves exposed walls faded and rough while sheltered walls still look fine.',
          'A color coat evens out the difference. Where the finish is worn thin or cracked, we repair it first.',
        ],
      },
      {
        heading: 'Cold nights',
        paragraphs: [
          'Edgewood gets colder at night than Albuquerque does. Any water in a crack freezes, expands and makes the crack bigger. Sealing cracks before winter is the simplest way to stop that cycle.',
          'We schedule stucco work so it can cure before freezing temperatures.',
        ],
      },
    ],
    focus: [
      { service: 'stucco-color-coat', why: 'For wind- and sun-worn walls that have faded unevenly.' },
      { service: 'stucco-repair', why: 'For freeze-thaw cracks before they grow.' },
      { service: 'stucco-garden-walls', why: 'For property and courtyard walls on larger lots.' },
    ],
    faqs: [
      {
        q: 'Do you travel to Edgewood?',
        a: 'Yes. Edgewood and the surrounding East Mountain communities are part of our service area.',
      },
      {
        q: 'Why does one side of my house look much more faded?',
        a: 'The walls facing the prevailing wind and the strongest sun wear and fade faster. A color coat over the whole house brings everything back to one even color.',
      },
    ],
    nearby: ['tijeras', 'sandia-park', 'albuquerque', 'los-lunas'],
  },
];

export const areaBySlug = (slug: string) => {
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown area slug: ${slug}`);
  return a;
};
