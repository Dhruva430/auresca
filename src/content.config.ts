import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Blog posts are plain Markdown files in `src/content/blog/`. Add a file,
 * commit, deploy — no database, no CMS. The filename becomes the URL slug
 * (`my-post.md` → `/blog/my-post`).
 */
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string().default("Skincare"),
    coverImage: z.string(),
    author: z.string().default("Auresca Care Team"),
    publishedAt: z.coerce.date(),
    /** Optional override — otherwise estimated from the word count. */
    readMinutes: z.number().optional(),
    /** Drafts are visible in `astro dev` but excluded from the build. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
