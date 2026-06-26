import mongoose from "mongoose";

let connected = false;

export function isDbConnected(): boolean {
  return connected && mongoose.connection.readyState === 1;
}

/**
 * Connect to MongoDB. Non-fatal: if the DB is unreachable we log and continue
 * so the marketing pages still render (they fall back to seed/static content).
 */
export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[db] MONGODB_URI not set — running without a database.");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    connected = true;
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    connected = false;
    console.warn(
      "[db] Could not connect to MongoDB — continuing with static content.",
      err instanceof Error ? err.message : err
    );
  }

  mongoose.connection.on("disconnected", () => {
    connected = false;
  });
  mongoose.connection.on("reconnected", () => {
    connected = true;
  });
}
