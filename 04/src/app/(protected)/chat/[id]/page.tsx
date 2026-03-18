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
  const [input, setInput] = useState("");
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

  const handleSend = async ()=>{
    if (!input.trim()) return;

    const res = await fetch("/api/chat", {
        method:"POST",
        body: JSON.stringify({
            conversationId: id,
            content: input
        })
    })

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    let aiText = "";

    while(true){
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value)
        aiText += chunk

        setMessages((prev)=>[
            ...prev.filter((m)=> m.id !== "stream"),
            {id: "stream", role:"assistant", content:aiText}
        ])
    }

      // refresh final messages
        const res2 = await fetch(`/api/message?conversationId=${id}`);
        const data = await res2.json();
        setMessages(data);

        setInput("");
  }

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
          value={input}
            className="flex-1 border p-2 rounded"
            placeholder="Type message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="bg-black text-white px-4 rounded cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
