"use client";

import { useEffect } from "react";
import ChatWindow from "@/comppnents/ChatWindow";
import Sidebar from "@/comppnents/Sidebar";
import { useChatStore } from "@/store/chatStore";

export default function Home() {
  const setActiveConversation = useChatStore((state)=>state.setActiveConversation)

  useEffect(() => {
  const initConversation = async () => {
    const existingId = localStorage.getItem("conversationId");

    if (existingId) {
      setActiveConversation(existingId);
      return;
    }

    const res = await fetch("/api/conversation", {
      method: "POST",
    });

    const data = await res.json();

    localStorage.setItem("conversationId", data.id);
    setActiveConversation(data.id);
  };

  initConversation();
}, []);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
