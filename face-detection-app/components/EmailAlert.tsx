"use client";

import { useEffect } from "react";

export default function EmailAlert({
  email,
}: {
  email: string;
}) {
  useEffect(() => {
    alert(`Welcome ${email}`);
  }, [email]);

  return null;
}