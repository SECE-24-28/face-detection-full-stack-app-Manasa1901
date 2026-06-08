"use client";

import { useEffect, useRef } from "react";

export default function EmailAlert({
  email,
}: {
  email: string;
}) {
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;
    hasShown.current = true;
    alert(`Welcome ${email}`);
  }, [email]);

  return null;
}