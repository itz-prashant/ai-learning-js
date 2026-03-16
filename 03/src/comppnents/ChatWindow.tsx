"use client"

import ChatInput from './ChatInput'
import Message from './Message'
import { useChatStore } from '@/store/chatStore'

const ChatWindow = () => {

  const message = useChatStore((state)=>state.messages)

  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className="flex-1 overflow-y-auto p-4">
        {message.map((m)=>(
          <Message key={m.id} role={m.role} message={m.content}/>
        ))}
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatWindow
