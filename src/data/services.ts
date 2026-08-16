/**
 * Long-form content for individual service pages.
 *
 * Why this file and not one hand-written page per service: `/services/[slug]`
 * renders every entry here through a single template, so a layout or SEO fix
 * lands on all of them at once and none of them can drift. Adding a service is
 * adding one object below — no new page, no copied markup.
 *
 * `slug` must match a `serviceCategories` slug in `site.ts`, which is what
 * links the treatment menu on the home page to the page for it. A category
 * with no entry here simply has no detail page, and nothing links to one.
 *
 * If this ever moves behind a CMS or an API, this module is the only thing
 * that has to change shape — the template consumes `ServiceDetail`, not JSON.
 */

import type { Faq } from "./site";

/** One row of the "areas we treat" table. */
export type PriceRow = {
  area: string;
  /** Typical course for this area — a range, never a promise. */
  sessions: string;
  /**
   * Starting price, formatted for display (e.g. "₹1,500"). Left undefined
   * until the clinic confirms the number; the table shows "On request" and
   * points at the consultation instead of inventing a figure.
   */
  priceFrom?: string;
};

export type PriceGroup = { title: string; rows: PriceRow[] };

/** A labelled fact for the strip under the hero. */
export type Spec = { icon: string; label: string; value: string };

export type Step = { title: string; desc: string };

export type Point = { title: string; desc: string };

/**
 * A service page carries a full reference FAQ rather than the short
 * objection-handling set the home page uses, so the questions are grouped.
 * `id` is the anchor the jump links target — keep it stable, it can be linked
 * to from outside.
 */
export type FaqGroup = { id: string; title: string; items: Faq[] };

export type ServiceDetail = {
  /** Must match a `serviceCategories` slug in `site.ts`. */
  slug: string;
  name: string;
  eyebrow: string;
  /** Hero sub-headline — one line, sets the promise. */
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  specs: Spec[];
  science: { title: string; body: string[] };
  visit: { title: string; intro: string; steps: Step[] };
  areas: {
    title: string;
    intro: string;
    note: string;
    groups: PriceGroup[];
  };
  technology: { title: string; intro: string; points: Point[] };
  suitability: {
    title: string;
    goodTitle: string;
    good: string[];
    waitTitle: string;
    wait: string[];
  };
  care: {
    title: string;
    intro: string;
    beforeTitle: string;
    before: string[];
    afterTitle: string;
    after: string[];
  };
  results: { title: string; lead: string; body: string[]; points: Point[] };
  faqGroups: FaqGroup[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "laser-hair-reduction",
    name: "Laser Hair Reduction",
    eyebrow: "Skin & Body",
    headline: "Smooth skin, session by session, at the wavelength your skin can take.",
    intro:
      "Medically supervised laser hair reduction for Indian and deeper skin tones. Comfortable, effectively downtime-free, and scheduled around your hair's own growth cycle so that every session lands when it can actually do something.",
    image: "/images/hero-laser.webp",
    imageAlt: "Laser hair reduction being performed at Auresca Care",
    metaTitle: "Laser Hair Reduction in Gurugram — Auresca Care",
    metaDescription:
      "Dermatology-led laser hair reduction in Gurugram for face and body. Wavelength matched to your skin type, cooled handpiece, no downtime. Free first consultation.",

    specs: [
      { icon: "laser", label: "Typical course", value: "6–8 sessions" },
      { icon: "clock", label: "Session length", value: "15–90 min by area" },
      { icon: "check", label: "Downtime", value: "None, resume your day" },
      {
        icon: "sparkle",
        label: "Spacing",
        value: "4–6 wks face · 6–8 wks body",
      },
      { icon: "shield", label: "Skin tones", value: "All, including deeper" },
      { icon: "stethoscope", label: "Supervision", value: "Medically led" },
    ],

    science: {
      title: "How laser hair reduction actually works",
      body: [
        "The laser emits a wavelength of light that the pigment in your hair absorbs far more readily than the surrounding skin. That light becomes heat, the heat travels down the hair shaft, and the follicle that produces it is disabled. This is selective photothermolysis: the target is the pigment, which is why dark, coarse hair responds best and why grey, white and very fine blonde hair largely does not.",
        "The catch, and the reason a single session can never finish the job, is that it only works on follicles in their active growth phase, called anagen. At any given moment roughly 20–30% of the hair in an area is in that phase; the rest is resting or shedding, and simply isn't attached to anything the laser can reach.",
        "So a course isn't upselling, it's arithmetic. Each session catches a different cohort of follicles as they rotate into growth, which is also why the gap between sessions matters as much as the sessions themselves. Come too early and you treat skin with nothing in anagen; leave it too long and you miss the window entirely.",
      ],
    },

    visit: {
      title: "What a session looks like",
      intro:
        "Nothing about the appointment should be a surprise. This is the whole sequence, from the first visit onward.",
      steps: [
        {
          title: "Consultation & patch test",
          desc: "We assess your skin type, hair type and medical history, and talk through what is realistic for your area. A small test patch confirms how your skin responds before any full session is booked.",
        },
        {
          title: "Prep & marking",
          desc: "The area is cleansed and shaved down if needed, then mapped into a treatment grid, so no patch is missed and none is passed over twice.",
        },
        {
          title: "Cooling & the laser pass",
          desc: "Contact cooling or chilled gel protects the surface of the skin while the handpiece works across the grid. Most people describe each pulse as a warm snap; numbing cream is available for sensitive areas.",
        },
        {
          title: "Soothing & aftercare",
          desc: "A calming gel and broad-spectrum sunscreen go on before you leave, along with written aftercare and your next appointment already booked at the right interval.",
        },
      ],
    },

    areas: {
      title: "Areas we treat",
      intro:
        "From a single upper lip to full body, for women and men. Session counts are the typical range for that area. Your own plan is confirmed after your consultation and patch test.",
      note: "Pricing depends on the area, your hair density and the plan agreed at consultation. Your first consultation is complimentary, and you will have the full cost in writing before anything is booked.",
      groups: [
        {
          title: "Face & neck",
          rows: [
            { area: "Upper Lip", sessions: "6–10" },
            { area: "Chin", sessions: "6–10" },
            { area: "Full Face", sessions: "6–10" },
            { area: "Lower Face", sessions: "6–10" },
            { area: "Side Locks", sessions: "6–8" },
            { area: "Earlobes", sessions: "4–6" },
            { area: "Beard Shaping", sessions: "6–8" },
          ],
        },
        {
          title: "Body",
          rows: [
            { area: "Full Body", sessions: "6–8" },
            { area: "Full Arms", sessions: "6–8" },
            { area: "Full Legs", sessions: "6–8" },
            { area: "Underarms", sessions: "6–8" },
            { area: "Bikini", sessions: "6–8" },
            { area: "Glutes", sessions: "6–8" },
            { area: "Front", sessions: "6–8" },
            { area: "Half Front", sessions: "6–8" },
            { area: "Back", sessions: "6–8" },
            { area: "Half Back", sessions: "6–8" },
          ],
        },
      ],
    },

    technology: {
      title: "Why the wavelength matters",
      intro:
        "The single biggest safety factor in laser hair reduction on Indian skin is choosing a wavelength your epidermis can tolerate. Melanin in the skin competes with melanin in the hair for the same light, and on deeper skin tones, the wrong choice is what causes burns and pigmentation.",
      points: [
        {
          title: "810 nm diode",
          desc: "Strong melanin absorption with enough depth to reach the follicle. The workhorse for most skin types and for coarse, dense hair.",
        },
        {
          title: "1064 nm Nd:YAG",
          desc: "A longer wavelength, absorbed least by pigment in the surface layer of the skin. This is the safer option for the deepest skin tones and for skin that has seen recent sun.",
        },
        {
          title: "Cooling at the contact point",
          desc: "The epidermis is chilled through every pulse. Cooling is not a comfort feature. It is what keeps the heat in the follicle instead of the skin above it.",
        },
        {
          title: "Settings matched to you",
          desc: "Fluence and pulse width are set from your skin type and your patch-test response, not from a standing preset. Lower energy over a longer pulse is often the right answer on deeper skin.",
        },
      ],
    },

    suitability: {
      title: "Is it right for you?",
      goodTitle: "Usually a good fit",
      good: [
        "Dark, coarse hair on any skin tone: pigment is the target, so this responds best",
        "Deeper skin tones, treated on an appropriately long wavelength",
        "Recurring ingrown hairs, razor bumps or folliculitis from shaving and waxing",
        "Hormonally driven facial hair, as one part of a plan that also looks at the cause",
        "Men looking for beard shaping, neckline, chest or back work",
      ],
      waitTitle: "Wait, or talk to us first",
      wait: [
        "Pregnancy or breastfeeding: treatment is deferred as a precaution",
        "Oral isotretinoin taken within the past six months",
        "Active infection, cold sore, eczema flare or broken skin in the area",
        "A fresh tan or significant sun exposure in the past 2–4 weeks",
        "Photosensitising medication: bring your full list, including supplements",
        "Grey, white, red or very fine blonde hair, which holds too little pigment to respond",
        "Waxing, threading or plucking the area within the past 3–4 weeks",
      ],
    },

    care: {
      title: "Before & after your session",
      intro:
        "Most disappointing courses of laser are not a machine problem. They are a preparation problem. These two lists carry more of the result than people expect.",
      beforeTitle: "In the days before",
      before: [
        "Shave the area 12–24 hours ahead. Stubble at the surface is fine; hair above it is not.",
        "Do not wax, thread, pluck or epilate for 3–4 weeks beforehand. The laser needs the follicle still in place to work on.",
        "Avoid sun, tanning beds and self-tanner for 2–4 weeks. A tan changes how much light your skin absorbs.",
        "Pause retinoids, AHAs, BHAs and scrubs on the area for about a week.",
        "Arrive with clean skin: no deodorant, makeup, oil or lotion on the treatment area.",
        "Tell us about every medication and supplement you take, especially isotretinoin, antibiotics and anything photosensitising.",
      ],
      afterTitle: "For the days after",
      after: [
        "Mild redness and small raised bumps around each follicle are normal, and usually settle within a few hours to a day.",
        "Skip hot showers, steam, sauna and the gym for 24–48 hours while the skin calms.",
        "Broad-spectrum SPF 30+ every day on treated skin that sees light. This is the single most important step for pigment safety.",
        "Shave between sessions as often as you like, but no waxing, threading or plucking.",
        "Treated hair sheds over the next one to three weeks and can look like regrowth. It isn't. Let it fall out on its own.",
        "Keep the next appointment at the interval we set. The spacing is doing half the work.",
      ],
    },

    results: {
      title: "What results look like, honestly",
      lead: "Lasers are cleared for permanent hair reduction, not permanent hair removal. The distinction is not a technicality, and a clinic that blurs it is setting you up to be disappointed.",
      body: [
        "Permanent reduction means a lasting drop in the number of hairs that grow back, stable for longer than a full growth cycle. Over a properly spaced course of six to eight sessions, most people see roughly a 70–90% reduction in the hair in a treated area, and what remains tends to come back finer, slower and lighter than it was.",
        "Electrolysis remains the only method described as permanent hair removal, follicle by follicle. It is slow and best suited to small areas, which is why laser is the practical choice for anything larger than a few stray hairs.",
      ],
      points: [
        {
          title: "After 2–3 sessions",
          desc: "Visible thinning and a slower return between shaves. This is the point where most people first notice the difference.",
        },
        {
          title: "After the full course",
          desc: "The bulk of the reduction, with the remaining hair finer and lighter. How much depends on your hair colour, thickness and hormones.",
        },
        {
          title: "Maintenance",
          desc: "An occasional top-up once or twice a year holds the result. Hormonally driven facial hair generally needs a little more.",
        },
        {
          title: "What changes the outcome",
          desc: "Hormonal conditions such as PCOS, medication, and above all, keeping to the spacing between sessions.",
        },
      ],
    },

    faqGroups: [
      {
        id: "basics",
        title: "The basics",
        items: [
          {
            q: "What is laser hair reduction?",
            a: "It is a medical treatment that uses a focused beam of light to disable the follicles producing unwanted hair. Over a course of sessions the treated area is left with markedly less hair, growing back finer and slower, rather than clearing it for a few weeks the way shaving or waxing does.",
          },
          {
            q: "How does laser hair reduction work?",
            a: "The laser emits a wavelength that pigment in your hair absorbs far more readily than the surrounding skin. That light becomes heat, travels down the hair shaft and disables the follicle at its root. Only follicles in their active growth phase respond, which is why a course is needed to reach them all.",
          },
          {
            q: "Is laser hair reduction permanent?",
            a: "It gives permanent hair reduction rather than permanent removal. Most people see roughly a 70–90% lasting drop in hair over a full course, with what remains growing back finer and lighter. An occasional top-up holds the result. Electrolysis is the only method described as permanent removal.",
          },
        ],
      },
      {
        id: "sessions",
        title: "Sessions, schedule & cost",
        items: [
          {
            q: "How many laser hair reduction sessions will I need?",
            a: "Usually six to eight. Hormonally driven facial hair, chin and upper lip especially, can take eight to ten, sometimes with ongoing maintenance. Your own number depends on your hair colour and thickness, the area treated and how your skin responds, and is confirmed after your consultation and patch test.",
          },
          {
            q: "How frequently should laser hair reduction sessions be taken?",
            a: "Facial areas are spaced roughly four to six weeks apart, body areas six to eight. The gap is not arbitrary. It is timed to catch the next group of follicles as they enter their growth phase. Come too early and there is little to target; leave it too long and you miss the window.",
          },
          {
            q: "How long does one laser hair reduction session take?",
            a: "From about fifteen minutes for a small facial area such as the upper lip or chin, to around ninety minutes for full body. Underarms take roughly fifteen minutes, full arms or legs closer to forty-five. Allow extra time for your first visit, which includes the consultation and patch test.",
          },
          {
            q: "What happens if I stop laser hair reduction midway through my sessions?",
            a: "The reduction you have already achieved does not reverse. Treated follicles stay treated. But follicles that had not yet cycled into their growth phase were never reached, so hair from those continues as before. You are left with partial rather than wasted results, and you can resume later.",
          },
          {
            q: "What does a course of laser hair reduction cost?",
            a: "It depends on the area, your hair density and the number of sessions your plan calls for. Your first consultation is complimentary, and you will have the full cost in writing before anything is booked, including whether a package or individual sessions works out better for you.",
          },
        ],
      },
      {
        id: "safety",
        title: "Comfort, safety & skin type",
        items: [
          {
            q: "Is laser hair reduction painful?",
            a: "Most people describe each pulse as a warm snap against the skin that fades immediately, and cooling runs throughout the session. Coarse, dense areas such as the bikini line and underarms are felt more than arms or legs. Numbing cream is available if you would prefer it.",
          },
          {
            q: "Can laser hair reduction be done on dark skin?",
            a: "Yes, provided the wavelength is chosen for your skin. Longer wavelengths such as 1064 nm Nd:YAG are absorbed far less by pigment in the surface of the skin, which is what makes them appropriate for deeper tones. Settings follow your patch test, never a standard preset.",
          },
          {
            q: "Can laser hair reduction cause skin darkening?",
            a: "Temporary post-inflammatory hyperpigmentation is possible, more so on deeper skin tones, and it usually fades over a few months. It is largely preventable: the right wavelength, conservative energy, thorough cooling, never treating freshly tanned skin, and daily sunscreen afterwards. Lasting darkening is rare when the treatment is done properly.",
          },
          {
            q: "Is laser hair reduction safe for sensitive skin?",
            a: "Usually yes, with adjusted settings and a patch test first. Tell us about eczema, rosacea, psoriasis or any history of reacting badly to heat or skincare, and we will treat a small area and wait to see how your skin settles before booking a full session.",
          },
        ],
      },
      {
        id: "areas",
        title: "Areas we treat",
        items: [
          {
            q: "Is laser hair reduction safe for the face?",
            a: "Yes, the face is among the most commonly treated areas, covering upper lip, chin, full or lower face, side locks and beard shaping. Facial skin is thinner and more sensitive, so the settings are gentler and sessions are spaced a little closer together, at four to six weeks.",
          },
          {
            q: "Can I get laser hair reduction on my underarms?",
            a: "Yes, and it is one of the most requested areas. Underarm hair is typically coarse and dark, which is exactly what the laser targets best, so results tend to show early. A session takes around fifteen minutes, and it puts an end to the ingrown hairs shaving and waxing cause.",
          },
          {
            q: "Can laser hair reduction be done on the bikini area?",
            a: "Yes. Bikini and Brazilian-style treatment are routine, carried out with your comfort and privacy in mind. The skin here is sensitive and the hair coarse, so it is one of the areas people feel most. Numbing cream is available, and the results are usually among the most noticeable.",
          },
          {
            q: "Can men get laser hair reduction?",
            a: "Yes. Beard shaping and neckline tidying, chest, back, shoulders, arms and full body are all commonly treated. The technology, session counts and spacing are the same. Beard work is usually about defining a line or thinning density rather than clearing the area completely.",
          },
          {
            q: "Is full-body laser hair reduction possible?",
            a: "Yes. Full body covers arms, legs, underarms, front and back in a single appointment of around ninety minutes. It works out more economical than booking areas separately, and keeps every area on the same schedule, which matters, because separately booked areas drift out of sync.",
          },
        ],
      },
      {
        id: "before-after",
        title: "Before & after your session",
        items: [
          {
            q: "Can I shave before laser hair reduction?",
            a: "You should. Shave the area twelve to twenty-four hours before your session. The laser needs to reach the follicle, not spend its energy on hair sitting above the skin. Shaving is also the one hair-removal method you can keep using freely between sessions.",
          },
          {
            q: "Should I wax before laser hair reduction?",
            a: "No. Avoid waxing, threading, plucking and epilating for three to four weeks beforehand and throughout your course. All of them pull the follicle out, and the follicle is precisely what the laser needs to find. Shaving is fine, because it leaves the root in place.",
          },
          {
            q: "Is there any downtime after laser hair reduction?",
            a: "Effectively none. Mild redness and small raised bumps around each follicle are normal and usually settle within a few hours to a day. Most people go straight back to their day. Skip the gym, hot showers, steam and sauna for the first 24 to 48 hours.",
          },
          {
            q: "What should I avoid after laser hair reduction?",
            a: "For 24 to 48 hours: heat, sweat and friction: gym, hot showers, steam, sauna and swimming. For the rest of your course: waxing, threading and plucking. And broad-spectrum SPF 30+ daily on treated skin that sees light, which is the single most important step for pigment safety.",
          },
        ],
      },
    ],
  },
];

/** Detail page for a category slug, when one has been written. */
export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

/** Slugs that have a detail page — used to decide what to link to. */
export const detailSlugs = new Set(serviceDetails.map((s) => s.slug));
