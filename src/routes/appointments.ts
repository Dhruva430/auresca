import { Router } from "express";
import { Appointment } from "../models/Appointment";
import { isDbConnected } from "../config/db";
import { serviceOptions } from "../data/site";

export const appointmentRouter = Router();

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

appointmentRouter.post("/", async (req, res) => {
  const { name, email, phone, service, preferredDate, preferredTime, message } =
    req.body ?? {};
  const wantsJson =
    req.xhr || (req.headers.accept ?? "").includes("application/json");

  const errors: string[] = [];
  if (!name || String(name).trim().length < 2) errors.push("a valid name");
  if (!email || !isEmail(String(email))) errors.push("a valid email");
  if (!phone || String(phone).replace(/\D/g, "").length < 8)
    errors.push("a valid phone number");
  if (!service) errors.push("a service");

  if (errors.length) {
    const msg = `Please provide ${errors.join(", ")}.`;
    if (wantsJson) return res.status(400).json({ ok: false, error: msg });
    return res.status(400).redirect("/#appointment");
  }

  const payload = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    service: String(service),
    preferredDate: preferredDate ? String(preferredDate) : "",
    preferredTime: preferredTime ? String(preferredTime) : "",
    message: message ? String(message).slice(0, 1000) : "",
  };

  try {
    if (isDbConnected()) {
      await Appointment.create(payload);
    } else {
      console.log("[appointment] (no DB) received:", payload);
    }
  } catch (err) {
    console.error("[appointment] save failed:", err);
    const msg = "Something went wrong saving your request. Please call us.";
    if (wantsJson) return res.status(500).json({ ok: false, error: msg });
    return res.status(500).redirect("/#appointment");
  }

  const success =
    "Thank you — your request is in. Our team will reach out within one business day to confirm your appointment.";
  if (wantsJson) return res.json({ ok: true, message: success });
  return res.render("pages/appointment-success", {
    title: "Request received — Auresca Care",
    message: success,
    serviceOptions,
  });
});
