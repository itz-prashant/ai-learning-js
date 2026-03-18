"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      console.log("Login success");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white p-2 border cursor-pointer"
      >
        Login
      </button>
    </div>
  );
}