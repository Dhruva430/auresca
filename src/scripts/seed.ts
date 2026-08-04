import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { blogFallback } from "../data/site";

const prisma = new PrismaClient();

const longBody = (intro: string) => `
<p>${intro}</p>
<h2>Why it matters</h2>
<p>Healthy, radiant skin is rarely the result of a single product or a one-off treatment. It is the outcome of consistency, the right clinical guidance, and respecting your skin's own biology. At Auresca Care we build every plan around those principles.</p>
<h2>What we recommend</h2>
<p>Start gentle, stay consistent, and let a professional guide the actives that genuinely move the needle for your concern. Book a complimentary consultation and we'll map a routine to your skin — never a generic checklist.</p>
<h2>The Auresca approach</h2>
<p>Reveal, restore, radiate. Our protocols are designed and supervised by qualified medical professionals using clinically approved technology, so you see real, lasting results in a space that feels like a retreat.</p>
`;

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Add it to your .env file.");
    process.exit(1);
  }

  await prisma.$connect();
  console.log("[seed] connected");

  await prisma.blog.deleteMany({});
  const docs = blogFallback.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    body: longBody(p.excerpt),
    coverImage: p.coverImage,
    category: p.category,
    author: p.author,
    readMinutes: p.readMinutes,
    publishedAt: new Date(p.publishedAt),
  }));
  await prisma.blog.createMany({ data: docs });
  console.log(`[seed] inserted ${docs.length} blog posts`);

  await prisma.$disconnect();
  console.log("[seed] done");
  process.exit(0);
}

run().catch(async (err) => {
  console.error("[seed] failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
