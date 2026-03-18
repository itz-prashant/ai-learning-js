"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 border-r h-full p-4 flex flex-col gap-4">
      <button
        onClick={() => router.push("/chat/123")}
        className="bg-black text-white p-2 rounded cursor-pointer border"
      >
        + New Chat
      </button>

      <div className="flex flex-col gap-2">
        <div
          onClick={() => router.push("/chat/123")}
          className="p-2 border rounded cursor-pointer"
        >
          Chat 1
        </div>

        <div
          onClick={() => router.push("/chat/456")}
          className="p-2 border rounded cursor-pointer"
        >
          Chat 2
        </div>
      </div>
    </div>
  );
}