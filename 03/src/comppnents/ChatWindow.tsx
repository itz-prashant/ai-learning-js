"use client"
import { useEffect } from "react";
import ChatInput from './ChatInput'
import Message from './Message'
import { useChatStore } from '@/store/chatStore'

const ChatWindow = () => {

  const messages = useChatStore((state)=>state.messages)
  const setMessages = useChatStore((s) => s.setMessages);
  const conversationId = useChatStore((s) => s.activeConversationId);

  useEffect(() => {
  const loadMessages = async () => {
    if (!conversationId) return;

    const res = await fetch(
      `/api/messages?conversationId=${conversationId}`
    );

    const data = await res.json();

    setMessages(data);
  };

  loadMessages();
}, [conversationId]);


  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m)=>(
          <Message key={m.id} role={m.role} message={m.content}/>
        ))}
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatWindow
