import type { APIRoute } from "astro";
import { APPOINTMENT_WEBHOOK_URL } from "astro:env/server";

/** The only route that is not prerendered — ships as a single Vercel function. */
export const prerender = false;

const SUCCESS =
  "Thank you — your request is in. Our team will reach out within one business day to confirm your appointment.";

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
    body = isJson
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    body = {};
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const { name, email, phone, service, preferredDate, preferredTime, message } =
    body;

  const errors: string[] = [];
  if (str(name).trim().length < 2) errors.push("a valid name");
  if (!isEmail(str(email))) errors.push("a valid email");
  if (str(phone).replace(/\D/g, "").length < 8) errors.push("a valid phone number");
  if (!str(service)) errors.push("a service");

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
    service: str(service),
    preferredDate: str(preferredDate),
    preferredTime: str(preferredTime),
    message: str(message).slice(0, 1000),
    receivedAt: new Date().toISOString(),
  };

  // No database: the request is logged, and forwarded to a webhook when one is
  // configured (see APPOINTMENT_WEBHOOK_URL in .env.example).
  console.log("[appointment]", payload);

  if (APPOINTMENT_WEBHOOK_URL) {
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
      // Never fail the visitor's booking because a downstream hook is down —
      // the request is already in the logs.
      console.error("[appointment] webhook failed:", err);
    }
  }

  if (wantsJson) {
    return new Response(JSON.stringify({ ok: true, message: SUCCESS }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
  return redirect("/appointment-success", 303);
};
