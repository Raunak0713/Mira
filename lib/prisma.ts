import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  // Only in development, we assign to globalThis to prevent creating multiple instances
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
} else {
  // In production, directly create a new Prisma client instance
  prisma = new PrismaClient();
}

export const db = prisma;
