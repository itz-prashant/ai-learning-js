"use client"

import { useChatStore } from "@/store/chatStore"
import { useState } from "react"

const ChatInput = () => {

    const [text, setText] = useState("")
    const addMessage = useChatStore((state)=> state.addMessage)
    const messages = useChatStore((state)=> state.messages)
    const updateMessage = useChatStore((state)=> state.updateMessage)

    const handleSend = async (e:any)=>{
        e.preventDefault();

        if(!text.trim()) return;
        
        addMessage({
          id: Date.now().toString(),
          role: "user",
          content: text
        })

        const aiId = (Date.now() + 1).toString();

        addMessage({
          id: aiId,
          role: "assistant",
          content: "",
        });

        setText("");

        const res = await fetch("/api/chat", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({messages: [...messages, {role: "user", content: "text"}]})
        })

        // const data = await res.json();
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()

        let aiText = ""

        while(true){
          const {done, value} = await reader!.read()
          if(done) break;

          const chunk = decoder.decode(value)
          aiText += chunk;

          updateMessage(aiId, aiText)
        }
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
