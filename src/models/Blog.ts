import { Schema, model, models, type InferSchemaType } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, default: "Skincare" },
    author: { type: String, default: "Auresca Care Team" },
    readMinutes: { type: Number, default: 4 },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export type BlogDoc = InferSchemaType<typeof blogSchema>;

export const Blog = models.Blog || model("Blog", blogSchema);
