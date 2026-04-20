"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ModalNoteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/notes/${params.id}`);
  }, [router, params.id]);

  return null;
}
