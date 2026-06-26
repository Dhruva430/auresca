import { Schema, model, models, type InferSchemaType } from "mongoose";

const appointmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    preferredDate: { type: String, default: "" },
    preferredTime: { type: String, default: "" },
    message: { type: String, default: "", maxlength: 1000 },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type AppointmentDoc = InferSchemaType<typeof appointmentSchema>;

export const Appointment =
  models.Appointment || model("Appointment", appointmentSchema);
