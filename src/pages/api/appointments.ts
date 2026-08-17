import type { APIRoute } from "astro";
import { APPOINTMENT_WEBHOOK_URL } from "astro:env/server";
import { isTreatment, submitToGoogleForm } from "@/lib/google-form";

/** The only route that is not prerendered — ships as a single Vercel function. */
export const prerender = false;

const SUCCESS =
  "Thank you. Your request is in. Our team will reach out within one business day to confirm your appointment.";

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const contentType = request.headers.get("content-type") ?? "";
  const accept = request.headers.get("accept") ?? "";
  const isJson = contentType.includes("application/json");
  // Browsers submitting the plain form get a redirect; fetch() gets JSON.
  const wantsJson = isJson || accept.includes("application/json");

  let body: Record<string, unknown> = {};
  try {
    if (isJson) {
      body = await request.json();
    } else {
      // Treatment is a tick-box group: fromEntries would keep only the last
      // box, so that one field is read with getAll.
      const data = await request.formData();
      body = Object.fromEntries(data);
      body.treatment = data.getAll("treatment");
    }
  } catch {
    body = {};
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  /** Tolerates the single-string shape too, in case a caller sends one. */
  const list = (v: unknown) =>
    (Array.isArray(v) ? v : [v]).filter((x): x is string => typeof x === "string");

  const { name, email, phone, treatment, concern } = body;
  const treatments = list(treatment).filter(isTreatment);

  const errors: string[] = [];
  if (str(name).trim().length < 2) errors.push("a valid name");
  if (str(phone).replace(/\D/g, "").length < 8) errors.push("a valid phone number");
  if (!isEmail(str(email))) errors.push("a valid email");
  if (!treatments.length) errors.push("at least one treatment");
  if (!str(concern).trim()) errors.push("your concern");

  if (errors.length) {
    const error = `Please provide ${errors.join(", ")}.`;
    if (wantsJson) {
      return new Response(JSON.stringify({ ok: false, error }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    return redirect("/#appointment", 303);
  }

  const payload = {
    name: str(name).trim(),
    email: str(email).trim(),
    phone: str(phone).trim(),
    treatment: treatments,
    concern: str(concern).trim().slice(0, 1000),
    receivedAt: new Date().toISOString(),
  };

  // No database: the request is logged, then fanned out to the clinic's Google
  // Form and — when one is configured — a webhook (see APPOINTMENT_WEBHOOK_URL
  // in .env.example). Both run together, and neither can fail the visitor's
  // booking: by this point the request is already in the logs.
  console.log("[appointment]", payload);

  const webhook = async () => {
    if (!APPOINTMENT_WEBHOOK_URL) return;
    try {
      const res = await fetch(APPOINTMENT_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[appointment] webhook responded", res.status);
      }
    } catch (err) {
      console.error("[appointment] webhook failed:", err);
    }
  };

  await Promise.all([submitToGoogleForm(payload), webhook()]);

  if (wantsJson) {
    return new Response(JSON.stringify({ ok: true, message: SUCCESS }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
  return redirect("/appointment-success", 303);
};
