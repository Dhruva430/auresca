/**
 * Site-wide static content for Auresca Care.
 * Marketing copy + structured content that rarely changes lives here so the
 * homepage renders instantly without a DB round-trip.
 */

export const site = {
  name: "Auresca Care",
  tagline: "Reveal • Restore • Radiate",
  shortPitch:
    "A boutique skin, hair & aesthetics clinic where medical precision meets quiet luxury.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "hello@aurescacare.com",
  address: "12 Orchard Lane, Bandra West, Mumbai 400050",
  hours: "Mon–Sat · 10:00 AM – 8:00 PM",
  socials: {
    instagram: "https://instagram.com",
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
};

/** Shared hero copy reused on every slide (matches the reference layout). */
export const heroMeta = {
  primaryCta: { label: "Book a Consultation", href: "/#appointment" },
  secondaryCta: { label: "Explore Services", href: "/#services" },
  features: ["Personalized treatment", "Expert practitioners", "Holistic approach"],
  trust: "2,400+ clients who trust Auresca Care",
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
    name: "Laser Hair Removal",
    eyebrow: "Laser Hair Removal",
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
  { value: "12+", label: "Years of expertise" },
  { value: "28k", label: "Treatments delivered" },
  { value: "4.9★", label: "Average client rating" },
  { value: "96%", label: "Would recommend us" },
];

/** Service filter categories (first = default active). */
export const serviceCategories = ["Skin", "Laser", "Body", "Hair"];

export type Service = {
  category: string;
  title: string;
  desc: string;
  image: string;
  local?: boolean;
};

export const services: Service[] = [
  // --- Skin ---
  {
    category: "Skin",
    title: "Signature Facial",
    desc: "A bespoke medical facial that deep-cleanses, hydrates and leaves skin visibly glowing.",
    image: "/images/service-skin-facial.jpg",
    local: true,
  },
  {
    category: "Skin",
    title: "HydraFacial & Glow",
    desc: "Painless resurfacing that clears congestion and infuses serums for an instant radiance boost.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  },
  {
    category: "Skin",
    title: "Anti-Ageing & Injectables",
    desc: "Subtle wrinkle relaxers, fillers and skin boosters that refresh — never overdone.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
  },
  // --- Laser ---
  {
    category: "Laser",
    title: "Laser Hair Removal",
    desc: "Comfortable, downtime-free laser that leaves skin smooth and beautifully even.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
  },
  {
    category: "Laser",
    title: "Laser Skin Resurfacing",
    desc: "Targeted light therapy for pigmentation, tone and texture — for clear, refined skin.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
  },
  // --- Body ---
  {
    category: "Body",
    title: "Body Polish & Hydration",
    desc: "Full-body exfoliation and deep nourishment that reveal soft, luminous skin.",
    image: "/images/service-body-cream.jpg",
    local: true,
  },
  {
    category: "Body",
    title: "Body Contouring",
    desc: "Non-invasive sculpting and skin tightening that define and refine on your timeline.",
    image: "/images/service-body-contour.jpg",
    local: true,
  },
  {
    category: "Body",
    title: "Relaxation Massage",
    desc: "Restorative therapeutic massage to release tension and reset body and mind.",
    image: "/images/service-body-massage.jpg",
    local: true,
  },
  // --- Hair ---
  {
    category: "Hair",
    title: "Scalp & Hair Therapy",
    desc: "Nourishing scalp treatments and massage that revitalise roots and soothe the senses.",
    image: "/images/service-hair-scalp.jpg",
    local: true,
  },
  {
    category: "Hair",
    title: "Hair Regrowth (PRP)",
    desc: "Evidence-based PRP and mesotherapy that bring density and strength back to your hair.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
  },
];

/** Treatment categories used for the Real Results filter tabs (first = default). */
export const resultCategories = [
  "Skin",
  "Laser Hair Removal",
  "Full Body Hair Removal",
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
    category: "Laser Hair Removal",
    concern: "Facial hair reduction",
    duration: "After 5 sessions",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    after: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
  },
  {
    category: "Laser Hair Removal",
    concern: "Underarm smoothness",
    duration: "After 6 sessions",
    before: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    after: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f",
  },
  // --- Full Body Hair Removal ---
  {
    category: "Full Body Hair Removal",
    concern: "Legs & arms",
    duration: "After 7 sessions",
    before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    after: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
  },
  {
    category: "Full Body Hair Removal",
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

/** Google-style review summary + individual reviews for the Reviews section. */
export const reviewSummary = {
  rating: "5.0",
  label: "Excellent",
  totalLabel: "2,438 reviews",
  breakdown: [
    { stars: 5, count: 2438 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};

export type Review = {
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  meta: string;
  verified?: boolean;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Ananya Mehta",
    avatar: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    rating: 5,
    timeAgo: "2 months ago",
    meta: "Local Guide · 12 reviews",
    verified: true,
    quote:
      "I have never felt so cared for. My skin looks like mine again — just brighter, calmer and genuinely healthy.",
  },
  {
    name: "Sara Iyer",
    avatar: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f",
    rating: 5,
    timeAgo: "3 weeks ago",
    meta: "7 reviews",
    verified: true,
    quote:
      "The team explained every step. No pressure, no upselling — only a plan that actually worked for my acne.",
  },
  {
    name: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
    rating: 5,
    timeAgo: "a month ago",
    meta: "Local Guide · 21 reviews",
    verified: true,
    quote:
      "Results that look natural. Friends keep asking if I'm sleeping better. The clinic feels like a retreat.",
  },
  {
    name: "Rhea Kapoor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    timeAgo: "5 months ago",
    meta: "9 reviews",
    verified: true,
    quote:
      "My laser sessions were quick and genuinely comfortable. Smooth, even skin and zero downtime — worth every visit.",
  },
  {
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    rating: 5,
    timeAgo: "a year ago",
    meta: "Local Guide · 33 reviews",
    verified: true,
    quote:
      "Came in for hair regrowth and the difference is real. Professional team, spotless clinic and honest advice throughout.",
  },
  {
    name: "Meera Joshi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5,
    timeAgo: "4 months ago",
    meta: "5 reviews",
    verified: true,
    quote:
      "The most relaxing facial I've ever had. My skin glowed for weeks and the staff remembered every little preference.",
  },
  {
    name: "Devika Rao",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    rating: 5,
    timeAgo: "2 months ago",
    meta: "Local Guide · 16 reviews",
    verified: true,
    quote:
      "Stunning results from my anti-ageing treatment — subtle, natural and exactly what I wanted. Booking and follow-up were effortless.",
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

/** Fallback blog content used when the database has no posts yet. */
export const blogFallback = [
  {
    title: "The 5-step evening routine your skin barrier actually wants",
    slug: "evening-routine-skin-barrier",
    excerpt:
      "Forget the 12-step trend. Here is the minimal, dermatologist-approved routine that repairs and protects while you sleep.",
    category: "Skincare",
    coverImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
    readMinutes: 5,
    author: "Dr. Kavya Rao",
    publishedAt: "2026-06-10",
  },
  {
    title: "Pigmentation, explained: why it happens and what truly fades it",
    slug: "pigmentation-explained",
    excerpt:
      "From melasma to sun spots — understand the real causes and the treatments that deliver lasting, even tone.",
    category: "Treatments",
    coverImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    readMinutes: 6,
    author: "Auresca Care Team",
    publishedAt: "2026-05-28",
  },
  {
    title: "Is laser hair reduction worth it? An honest clinic guide",
    slug: "laser-hair-reduction-guide",
    excerpt:
      "Sessions, sensations, results and myths — everything we wish every client knew before their first appointment.",
    category: "Laser",
    coverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    readMinutes: 4,
    author: "Dr. Kavya Rao",
    publishedAt: "2026-05-12",
  },
  {
    title: "HydraFacial: the secret behind that instant, lit-from-within glow",
    slug: "hydrafacial-instant-radiance",
    excerpt:
      "Cleanse, extract, hydrate — how this gentle three-step ritual leaves skin plumper and brighter in under an hour.",
    category: "Beauty",
    coverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    readMinutes: 5,
    author: "Auresca Care Team",
    publishedAt: "2026-04-30",
  },
];

export const serviceOptions = services.map((s) => s.title);
