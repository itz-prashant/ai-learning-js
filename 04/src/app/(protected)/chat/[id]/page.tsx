"use client"
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();

  const id = params.id as string;

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch(`/api/message?conversationId=${id}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessage();
  }, [id]);

  return (
    <div className="flex h-[90vh]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* messages */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {messages.map((m)=>(
            <div key={m.id}
              className={`p-2 rounded w-fit ${
                m.role === "user"
                  ? "bg-neutral-600"
                  : "bg-black text-white"
              }`}>
                    {m.content}
            </div>
          ))}
        </div>

        {/* input */}
        <div className="p-4 border-t flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="Type message..."
          />
          <button className="bg-black text-white px-4 rounded cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
