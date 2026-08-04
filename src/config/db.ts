import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient across tsx-watch reloads to avoid exhausting
// the connection pool in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

let connected = false;

export function isDbConnected(): boolean {
  return connected;
}

/**
 * Connect to MongoDB through Prisma. Non-fatal: if the DB is unreachable we
 * log and continue so the marketing pages still render from static content.
 */
export async function connectDB(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.warn("[db] DATABASE_URL not set — running without a database.");
    return;
  }

  try {
    await prisma.$connect();
    // Probe the connection so we only flag "connected" if queries actually work.
    await prisma.$runCommandRaw({ ping: 1 });
    connected = true;
    console.log("[db] Connected to MongoDB via Prisma");
  } catch (err) {
    connected = false;
    console.warn(
      "[db] Could not connect to MongoDB — continuing with static content.",
      err instanceof Error ? err.message : err
    );
  }
}
