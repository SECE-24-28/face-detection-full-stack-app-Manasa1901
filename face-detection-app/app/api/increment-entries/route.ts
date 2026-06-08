import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      entries: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(user);
}