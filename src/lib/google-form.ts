/**
 * Appointment requests → the clinic's Google Form.
 *
 * `/api/appointments` calls `submitToGoogleForm` after it has validated a
 * request, so every booking lands as a row in the form's response sheet.
 *
 * The entry ids below come from the form's own `FB_PUBLIC_LOAD_DATA_` blob
 * (visible in the page source of the /viewform URL). They are stable for the
 * life of a question — but *editing* a question in the Forms UI can mint a new
 * one, so if responses stop arriving, re-read them from there before anything
 * else.
 */
import { treatmentOptions } from "@/data/site";

/** Public form id — the same one that appears in the shareable /viewform link. */
const FORM_ID =
  "1FAIpQLSck2Pa2R4Dhr7QUlf_VIm8OFLVkEb-iewijlT0KE2VZmqrSLA";

const RESPONSE_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

/** Question → entry id. Every one of these is required by the form. */
const ENTRY = {
  name: "entry.244441245", // "Name"
  phone: "entry.926626309", // "Contact No."
  email: "entry.1107197661", // "Email Id"
  concern: "entry.1013484082", // "Your Concern"
  treatment: "entry.1106300414", // "Treatment You're Planning"
} as const;

/**
 * "Treatment You're Planning" is a checkbox question, so each value has to match
 * one of its five options *character for character* — anything else is rejected
 * as an invalid choice. Copied verbatim from the form, which is why the laser
 * option still reads "Bread Shaping": fix that typo in the Forms UI and this
 * string has to change with it.
 *
 * Keyed by the `value` of each entry in `treatmentOptions` (src/data/site.ts),
 * the list the site's own tick-boxes are built from. The check below shouts at
 * start-up if one is ever added there without a home here.
 */
const TREATMENT_OPTIONS: Record<string, string> = {
  "laser-hair-reduction":
    "LASER HAIR REDUCTION: Full Body, Full Face, Upper Lips, Bread Shaping, etc",
  "skin-treatment":
    "SKIN TREATMENT: Medi-Facial, Q-Switch, Carbon Facial, RF, etc",
  "anti-ageing":
    "ANTI-AGEING: Skin-PRP, Skin-GFC, Face-Exosomes, Pigmentation Peel, etc",
  "hair-regeneration":
    "HAIR REGENERATION: Hair-PRP, Hair-GFC, Hair-Exosomes, QR678, etc",
  "body-contouring":
    "BODY CONTOURING: Cool-Sculpt, Curve-Expert, G5, Tummy Tuck, etc",
};

const unmapped = treatmentOptions
  .map((t) => t.value)
  .filter((value) => !(value in TREATMENT_OPTIONS));
if (unmapped.length) {
  console.error(
    "[google-form] no checkbox option for treatment:",
    unmapped.join(", ")
  );
}

/** True for a value the form will actually accept. */
export function isTreatment(value: string): boolean {
  return value in TREATMENT_OPTIONS;
}

export type AppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  /** One or more `treatmentOptions` values — already filtered by the endpoint. */
  treatment: string[];
  concern: string;
};

/**
 * Posts one appointment request to the form. Resolves `true` when Google
 * accepted it; never throws — a booking must not fail because Forms is having
 * a bad day, and the request is already in the server log by this point.
 */
export async function submitToGoogleForm(
  payload: AppointmentPayload
): Promise<boolean> {
  const options = payload.treatment
    .map((value) => TREATMENT_OPTIONS[value])
    .filter(Boolean);

  if (!options.length) {
    // The question is required and rejects anything off its own list, so there
    // is nothing useful to send.
    console.error(
      "[google-form] no valid treatment, not submitting:",
      payload.treatment.join(", ")
    );
    return false;
  }

  const body = new URLSearchParams({
    [ENTRY.name]: payload.name,
    [ENTRY.phone]: payload.phone,
    [ENTRY.email]: payload.email,
    [ENTRY.concern]: payload.concern,
    // Tells Forms this is a complete single-page submission rather than a
    // partial one, which is what its own viewer sends.
    fvv: "1",
    pageHistory: "0",
  });
  // A checkbox answer is one repeated parameter per box ticked.
  for (const option of options) body.append(ENTRY.treatment, option);

  try {
    const res = await fetch(RESPONSE_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error("[google-form] responded", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[google-form] submission failed:", err);
    return false;
  }
}
