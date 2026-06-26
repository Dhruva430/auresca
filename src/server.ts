import "dotenv/config";
import path from "path";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import expressLayouts from "express-ejs-layouts";

import { connectDB } from "./config/db";
import { img, srcset, formatDate } from "./lib/helpers";
import { site, nav } from "./data/site";
import { homeRouter } from "./routes/index";
import { appointmentRouter } from "./routes/appointments";
import { blogRouter } from "./routes/blog";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

// ----- Security & performance middleware -----
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'sha256-Du+OJKJSbdUgz5nrHeWWINvez6XKDDU/tyj/5c2uvwo='"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());

// ----- View engine -----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// ----- Static assets with long cache in prod -----
app.use(
  express.static(path.join(__dirname, "..", "public"), {
    maxAge: isProd ? "30d" : 0,
    etag: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----- Template-wide locals -----
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.nav = nav;
  res.locals.img = img;
  res.locals.srcset = srcset;
  res.locals.formatDate = formatDate;
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.title = `${site.name} — Reveal · Restore · Radiate`;
  res.locals.description = site.shortPitch;
  res.locals.bodyClass = "";
  next();
});

// ----- Routes -----
app.use("/", homeRouter);
app.use("/appointments", appointmentRouter);
app.use("/blog", blogRouter);

// ----- 404 -----
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Page not found — " + site.name });
});

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Auresca Care running at http://localhost:${PORT}`);
  });
});
