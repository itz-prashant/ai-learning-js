"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-4 h-[10vh] border-b">
      <h1 onClick={()=> router.push("/")} className="font-bold text-lg cursor-pointer">My App</h1>

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