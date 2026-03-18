"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center px-4 h-[10vh] border-b">
      <h1 className="font-bold text-lg">My App</h1>

      <div className="flex items-center gap-4">
        <span>{session?.user?.email}</span>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}