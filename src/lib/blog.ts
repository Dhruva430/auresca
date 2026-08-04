import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/** Published posts, newest first. Drafts show in dev only. */
export async function getPosts(limit?: number): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.DEV ? true : !data.draft
  );
  posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

/** Frontmatter value when present, otherwise ~200 words per minute. */
export function readMinutes(post: Post): number {
  if (post.data.readMinutes) return post.data.readMinutes;
  const words = (post.body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
