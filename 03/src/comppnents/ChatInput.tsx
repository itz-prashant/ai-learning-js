"use client"

import { useChatStore } from "@/store/chatStore"
import { useState } from "react"

const ChatInput = () => {

    const [text, setText] = useState("")
    const addMessage = useChatStore((state)=> state.addMessage)

    const handleSend = (e:any)=>{
        e.preventDefault();

        if(!text.trim()) return;
        
        addMessage({
          id: Date.now().toString(),
          role: "user",
          content: text
        })

        setText("");
    }
  return (
    <form onSubmit={handleSend} className='border-t p-4'>
      <input 
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder='Send a message....'
        className='w-full border rounded-lg px-4 py-2  outline-none'
       />
    </form>
  )
}

export default ChatInput
