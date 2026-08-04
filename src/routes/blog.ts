import { Router } from "express";
import { prisma, isDbConnected } from "../config/db";
import { blogFallback } from "../data/site";

export const blogRouter = Router();

blogRouter.get("/", async (_req, res) => {
  let posts = blogFallback as any[];
  if (isDbConnected()) {
    try {
      const dbPosts = await prisma.blog.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
      });
      if (dbPosts.length) posts = dbPosts;
    } catch {
      /* use fallback */
    }
  }
  res.render("pages/blog", {
    title: "Journal — Auresca Care",
    description: "Skin, hair & aesthetics insight from the Auresca Care team.",
    posts,
  });
});

blogRouter.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  let post: any = blogFallback.find((p) => p.slug === slug) ?? null;

  if (isDbConnected()) {
    try {
      const dbPost = await prisma.blog.findFirst({
        where: { slug, published: true },
      });
      if (dbPost) post = dbPost;
    } catch {
      /* use fallback */
    }
  }

  if (!post) {
    return res
      .status(404)
      .render("pages/404", { title: "Article not found — Auresca Care" });
  }

  res.render("pages/blog-post", {
    title: `${post.title} — Auresca Care`,
    description: post.excerpt,
    post,
  });
});
