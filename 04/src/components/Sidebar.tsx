"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Conversation = {
  id: string;
};

export default function Sidebar() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
        const res = await fetch("/api/conversation")
        const data = await res.json();
        setConversations(data);
    }
    fetchData()
  }, [])

  const handleNewChat = async ()=>{
    const res = await fetch('/api/conversation', {
        method: "POST"
    })
 
    const data = await res.json();
    router.push(`/chat/${data.id}`);

  }
  return (
    <div className="w-64 border-r h-full p-4 flex flex-col gap-4">
      <button
        onClick={handleNewChat}
        className="bg-black text-white p-2 rounded cursor-pointer border"
      >
        + New Chat
      </button>

      <div className="flex flex-col gap-2">
        {conversations.map((c)=>(
            <div
                key={c.id}
                onClick={() => router.push(`/chat/${c.id}`)}
                className="p-2 border rounded cursor-pointer"
            >
                {c.id}
            </div>
        ))}
      </div>
    </div>
  );
}