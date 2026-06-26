import { Router } from "express";
import { Blog } from "../models/Blog";
import { isDbConnected } from "../config/db";
import {
  heroSlides,
  heroMeta,
  about,
  services,
  serviceCategories,
  beforeAfter,
  resultCategories,
  testimonials,
  reviews,
  reviewSummary,
  faqs,
  stats,
  whyUs,
  blogFallback,
  serviceOptions,
} from "../data/site";

export const homeRouter = Router();

homeRouter.get("/", async (_req, res) => {
  let posts = blogFallback as any[];

  if (isDbConnected()) {
    try {
      const dbPosts = await Blog.find({ published: true })
        .sort({ publishedAt: -1 })
        .limit(4)
        .lean();
      if (dbPosts.length) posts = dbPosts;
    } catch {
      /* fall back to static posts */
    }
  }

  res.render("pages/home", {
    bodyClass: "home",
    heroSlides,
    heroMeta,
    about,
    services,
    serviceCategories,
    beforeAfter,
    testimonials,
    reviews,
    reviewSummary,
    faqs,
    stats,
    whyUs,
    posts,
    serviceOptions,
    resultCategories,
  });
});
