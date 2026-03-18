"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-2xl font-bold">Signup</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />

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
        onClick={handleSignup}
        className="bg-black text-white p-2 border cursor-pointer"
      >
        Signup
      </button>
    </div>
  );
}