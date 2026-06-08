"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createToken } from "@/lib/jwt";

export async function signupUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

    redirect("/login");

}

export async function loginUser(
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!validPassword) {
    throw new Error("Invalid Password");
  }

  const token = createToken(
  user.id.toString(),
  user.email
);

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  redirect("/login");
}