/**
 * Site-wide static content for Auresca Care.
 * Marketing copy + structured content that rarely changes lives here so every
 * page can be prerendered at build time. Blog posts come from Markdown files
 * in `src/content/blog/` (see `src/content.config.ts`).
 */

export const site = {
  name: "Auresca Care",
  tagline: "Reveal • Restore • Radiate",
  shortPitch:
    "A boutique skin, hair & aesthetics clinic where medical precision meets quiet luxury.",
  phone: "+91 89207 53013",
  phoneHref: "tel:+918920753013",
  /** wa.me needs the number bare — country code, no +, spaces or dashes. */
  whatsappHref: "https://wa.me/918920753013",
  email: "aurescacare@gmail.com",
  /**
   * Google Business Profile. The place ID drives both links below — swap it
   * and they both follow. `googleReviewUrl` opens Google's own write-a-review
   * dialog (signing the visitor in first if they aren't already).
   */
  googlePlaceId: "ChIJwRwOVa8ZDTkRYy9_7Zh4dH4",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJwRwOVa8ZDTkRYy9_7Zh4dH4",
  googleListingUrl:
    "https://local.google.com/place?placeid=ChIJwRwOVa8ZDTkRYy9_7Zh4dH4",
  address:
    "2nd Floor, 594 P, Golf Course Road, Sector-43, Gurugram, Haryana 122009",
  hours: "Mon–Sat · 10:00 AM – 8:00 PM",
  socials: {
    instagram: "https://www.instagram.com/aurescacare/",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#results" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/#blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Appointments", href: "/#appointment" },
];

export type HeroSlide = {
  name: string; // the headline shown on the left — just the service name
  eyebrow: string; // short label used for the slide selector
  image: string; // local path (local:true) or Unsplash base URL
  local?: boolean;
  primary?: boolean;
  headingClass?: string; // override heading colour for legibility on this image
  objectClass?: string; // override object-position crop for this image
  align?: "left" | "right"; // which side of the hero the copy sits on
  dark?: boolean; // dark background image → use light body/feature text
  // headline split into three parts; the middle is rendered italic
  lead: string;
  accent: string;
  tail: string;
  desc: string;
  cta?: { label: string; href: string };
};

/** Shared hero copy reused on every slide (matches the reference layout). */
export const heroMeta = {
  primaryCta: { label: "Book a Consultation", href: "/#appointment" },
  secondaryCta: { label: "Explore Services", href: "/#services" },
  features: ["Personalized treatment", "Expert practitioners", "Holistic approach"],
  trust: "1,000+ clients who trust Auresca Care",
};

/**
 * Full-page hero carousel. Each slide pairs a real photo with a tailored
 * headline, description, CTAs and trust row. The first (primary) slide is
 * skincare and uses the real brand photo.
 */
export const heroSlides: HeroSlide[] = [
  {
    name: "Skincare",
    eyebrow: "Skincare",
    image: "/images/hero-skincare.jpg",
    local: true,
    primary: true,
    headingClass: "text-olive",
    objectClass: "object-[70%_top] lg:object-top",
    lead: "Reveal Your",
    accent: "Radiant",
    tail: "Skin",
    desc: "Dermatology-led facials and skin rejuvenation, tailored to your skin barrier for a glow that lasts.",
    cta: { label: "Book free consultation", href: "/#appointment" },
  },
  {
    name: "Hair Regrowth",
    eyebrow: "Hair Regrowth",
    image: "/images/hero-hair-3.jpg",
    local: true,
    headingClass: "text-olive",
    objectClass: "object-right",
    lead: "Restore Your",
    accent: "Natural",
    tail: "Hair",
    desc: "Advanced PRP, mesotherapy and scalp programmes that bring density and strength back to your hair.",
    cta: { label: "Book free consultation", href: "/#appointment" },
  },
  {
    name: "Anti-Ageing Injectables",
    eyebrow: "Anti-Ageing",
    image: "/images/hero-antiageing.jpg",
    local: true,
    headingClass: "text-olive",
    objectClass: "object-right",
    lead: "Turn Back",
    accent: "Time,",
    tail: "Gracefully",
    desc: "Subtle, expert-administered injectables and skin boosters that refresh and lift — never overdone.",
    cta: { label: "Book free consultation", href: "/#appointment" },
  },
  {
    name: "Laser Hair Reduction",
    eyebrow: "Laser Hair Reduction",
    image: "/images/hero-laser.jpg",
    local: true,
    headingClass: "text-olive",
    lead: "Smooth,",
    accent: "Effortless",
    tail: "Confidence",
    desc: "Comfortable, downtime-free laser hair removal for silky, beautifully even-toned skin.",
    cta: { label: "Book free consultation", href: "/#appointment" },
  },
  {
    name: "Body Shaping",
    eyebrow: "Body Shaping",
    image: "/images/hero-body.jpg",
    local: true,
    headingClass: "text-olive",
    objectClass: "object-right",
    lead: "Sculpt the",
    accent: "Shape",
    tail: "You Love",
    desc: "Non-invasive contouring and skin tightening that define and refine on your own timeline.",
    cta: { label: "Book free consultation", href: "/#appointment" },
  },
];

/** About-us band: intro copy + the four "why choose us" highlights. */
export const about = {
  eyebrow: "About Us",
  heading: { lead: "Beauty That Begins", tail: "With Care" },
  body: "At Auresca Care, we believe true beauty is a reflection of inner balance and self-care. Our treatments are designed to nourish, restore and enhance your natural glow.",
  image: "/images/about-clinic.jpg",
  local: true,
  cta: { label: "Learn More", href: "/#services" },
  features: [
    { icon: "stethoscope", title: "Expert Therapists" },
    { icon: "laser", title: "Advanced Technology" },
    { icon: "shield", title: "Safe & Effective" },
    { icon: "leaf", title: "Natural & Premium Products" },
  ],
};

export const stats = [
  { value: "4+", label: "Years of expertise" },
  { value: "1,000+", label: "Treatments delivered" },
  { value: "4.9★", label: "Average client rating" },
  { value: "96%", label: "Would recommend us" },
];

/**
 * The full treatment menu. Each category becomes a tab in the Services section
 * and an <optgroup> in the appointment form, so adding a treatment here is the
 * only edit needed for it to appear in both places.
 */
export type ServiceGroup = {
  /** Optional sub-heading — omit for a single flat list. */
  title?: string;
  items: string[];
};

export type ServiceCategory = {
  slug: string;
  /** Short label for the tab + the form's optgroup. */
  label: string;
  title: string;
  tagline: string;
  image: string;
  local?: boolean;
  groups: ServiceGroup[];
};

/** Service filter categories (first = default active). */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "laser-hair-reduction",
    label: "Laser Hair Reduction",
    title: "Laser Hair Reduction",
    tagline:
      "Comfortable, downtime-free laser for smooth, beautifully even skin — every area, from a single upper lip to full body.",
    image: "/images/hero-laser.jpg",
    local: true,
    groups: [
      {
        title: "Face & neck",
        items: [
          "Full Face",
          "Lower Face",
          "Upper Lip",
          "Chin",
          "Side Locks",
          "Earlobes",
          "Beard Shaping",
        ],
      },
      {
        title: "Arms & legs",
        items: ["Full Arms", "Half Arms", "Full Legs", "Half Legs"],
      },
      {
        title: "Body",
        items: [
          "Full Body",
          "Underarms",
          "Bikini",
          "Glutes",
          "Front",
          "Half Front",
          "Back",
          "Half Back",
        ],
      },
    ],
  },
  {
    slug: "facials",
    label: "Facials",
    title: "Facials & Medi-Facials",
    tagline:
      "Clinical facials tailored to your skin barrier — from a quick radiance boost to a full medi-facial protocol.",
    image: "/images/service-skin-facial.jpg",
    local: true,
    groups: [
      {
        items: [
          "Hydra Facial",
          "Carbon Facial",
          "Q-Switch / Instabright",
          "Medi Facial",
          "Mud Facial",
          "RF Facial",
          "Fruit Facial",
        ],
      },
    ],
  },
  {
    slug: "body-contouring",
    label: "Body Contouring",
    title: "Body Contouring & Slimming",
    tagline:
      "Non-invasive sculpting, fat reduction and skin tightening that define and refine on your own timeline.",
    image: "/images/service-body-contour.jpg",
    local: true,
    groups: [
      {
        items: [
          "Coolsculpt",
          "Lipo Laser",
          "G5",
          "Udvartana",
          "AVT Therapy",
          "Tummy Tuck",
          "NMS",
          "FDS",
          "Curve Expert",
          "Slimzone",
        ],
      },
    ],
  },
  {
    slug: "antiaging",
    label: "Antiaging",
    title: "Antiaging & Injectables",
    tagline:
      "Regenerative therapy, expert-administered injectables and precision resurfacing — supervised by qualified medical professionals.",
    image: "/images/hero-antiageing.jpg",
    local: true,
    groups: [
      {
        title: "Regenerative therapy & pigmentation",
        items: [
          "PRP — Skin (Vampire Facial)",
          "GFC — Skin (Advanced Vampire Facial)",
          "Exosomes — Face",
          "Body Peel",
          "Deep Pigmentation Peel",
        ],
      },
      {
        title: "Injectables",
        items: [
          "Botox",
          "Fillers",
          "Skin Booster",
          "Profhilo",
          "Hyaluronic",
          "PDRN",
          "Threads / Collagen Threads",
          "Mounjaro",
        ],
      },
      {
        title: "IV drips",
        items: ["Vitamin Drip", "Miracle White Drip"],
      },
      {
        title: "Resurfacing & removal",
        items: [
          "Dermapen / Microneedling",
          "Mole, Wart & Skin Tag Removal",
          "Tattoo Removal",
          "Fractional Laser",
        ],
      },
    ],
  },
  {
    slug: "hair-regeneration",
    label: "Hair Regeneration",
    title: "Hair Regeneration",
    tagline:
      "Regenerative scalp therapy that restores density and strength — PRP, GFC and exosome protocols.",
    image: "/images/service-hair-scalp.jpg",
    local: true,
    groups: [
      {
        items: [
          "PRP — Hair",
          "GFC — Hair",
          "Exosomes — Hair",
          "QR678",
          "Microneedling — Hair",
        ],
      },
    ],
  },
];

/** Image used by the "Why Auresca" band. */
export const whyUsImage =
  "https://images.unsplash.com/photo-1612817288484-6f916006741a";

/** Treatment categories used for the Real Results filter tabs (first = default). */
export const resultCategories = [
  "Skin",
  "Laser Hair Reduction",
  "Full Body Hair Reduction",
  "Hair Regrowth",
  "Anti-Ageing Injectables",
];

export type BeforeAfter = {
  category: string;
  concern: string;
  duration: string;
  before: string;
  after: string;
};

export const beforeAfter: BeforeAfter[] = [
  // --- Skin ---
  {
    category: "Skin",
    concern: "Skin firmness & lift",
    duration: "After 12 weeks",
    before: "/images/result-1-before.jpg",
    after: "/images/result-1-after.jpg",
  },
  {
    category: "Skin",
    concern: "Brightness & under-eyes",
    duration: "After 10 weeks",
    before: "/images/result-2-before.jpg",
    after: "/images/result-2-after.jpg",
  },
  {
    category: "Skin",
    concern: "Tightening & glow",
    duration: "After 12 weeks",
    before: "/images/result-3-before.jpg",
    after: "/images/result-3-after.jpg",
  },
  // --- Laser Hair Removal ---
  {
    category: "Laser Hair Reduction",
    concern: "Facial hair reduction",
    duration: "After 5 sessions",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    after: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
  },
  {
    category: "Laser Hair Reduction",
    concern: "Underarm smoothness",
    duration: "After 6 sessions",
    before: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    after: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f",
  },
  // --- Full Body Hair Removal ---
  {
    category: "Full Body Hair Reduction",
    concern: "Legs & arms",
    duration: "After 7 sessions",
    before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    after: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
  },
  {
    category: "Full Body Hair Reduction",
    concern: "Back & shoulders",
    duration: "After 8 sessions",
    before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9",
    after: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
  },
  // --- Hair Regrowth ---
  {
    category: "Hair Regrowth",
    concern: "Crown density",
    duration: "After 4 months",
    before: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
    after: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
  },
  {
    category: "Hair Regrowth",
    concern: "Hairline restoration",
    duration: "After 6 months",
    before: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f",
    after: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
  },
  // --- Anti-Ageing Injectables ---
  {
    category: "Anti-Ageing Injectables",
    concern: "Fine lines & firmness",
    duration: "After 3 months",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    after: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
  },
  {
    category: "Anti-Ageing Injectables",
    concern: "Cheek & jaw definition",
    duration: "After 8 weeks",
    before: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  treatment: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I have never felt so cared for. My skin looks like mine again — just brighter, calmer and genuinely healthy.",
    name: "Ananya Mehta",
    treatment: "HydraFacial · Pigmentation",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
  },
  {
    quote:
      "The team explained every step. No pressure, no upselling — only a plan that actually worked for my acne.",
    name: "Sara Iyer",
    treatment: "Acne Programme",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f",
  },
  {
    quote:
      "Results that look natural. Friends keep asking if I'm sleeping better. The clinic itself feels like a retreat.",
    name: "Priya Nair",
    treatment: "Skin Boosters",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
  },
];


export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How do I know which treatment is right for me?",
    a: "Every journey begins with a complimentary consultation. Our dermatology-led team assesses your skin, listens to your goals and builds a personalised plan — there is never any obligation to proceed.",
  },
  {
    q: "Are the treatments safe and who performs them?",
    a: "All procedures are performed or supervised by qualified medical professionals using clinically approved technology. Your safety, comfort and consent guide every decision we make.",
  },
  {
    q: "Is there any downtime?",
    a: "Most of our facials and laser treatments are designed to fit into a busy life with little to no downtime. Where a procedure needs recovery, we tell you exactly what to expect beforehand.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on your concern and skin. Many clients see a visible difference after the first session, with a recommended course for lasting results — we'll share a clear roadmap upfront.",
  },
  {
    q: "What does a consultation cost?",
    a: "Your first consultation is on us. We'd rather earn your trust with honest advice than with a price tag.",
  },
];

export const whyUs = [
  {
    icon: "stethoscope",
    title: "Dermatology-led care",
    desc: "Protocols designed and supervised by qualified medical experts — never a one-size-fits-all menu.",
  },
  {
    icon: "sparkle",
    title: "Quiet-luxury experience",
    desc: "A calm, private space designed to feel less like a clinic and more like a restorative retreat.",
  },
  {
    icon: "leaf",
    title: "Honest, tailored plans",
    desc: "Transparent advice and pricing. We only ever recommend what your skin genuinely needs.",
  },
  {
    icon: "shield",
    title: "Proven, safe technology",
    desc: "Clinically approved devices and medical-grade products with results you can see and trust.",
  },
];

/** Time slots offered in the appointment form. */
export const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

/**
 * Grouped options for the appointment form — one <optgroup> per category. The
 * submitted value carries the category so a bare "Full Body" or "Back" is never
 * ambiguous in the clinic's inbox.
 */
export const serviceOptions = serviceCategories.map((cat) => ({
  label: cat.label,
  options: cat.groups.flatMap((group) =>
    group.items.map((item) => ({ label: item, value: `${cat.label}: ${item}` }))
  ),
}));

/** Total number of treatments on the menu. */
export const serviceCount = serviceOptions.reduce(
  (total, group) => total + group.options.length,
  0
);
