"use server";

import { prisma } from "@/lib/prisma";

export async function incrementEntries(userId: number) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      entries: {
        increment: 1,
      },
    },
  });
}

export async function getUser(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}