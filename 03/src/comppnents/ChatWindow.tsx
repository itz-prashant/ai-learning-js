import React from 'react'
import ChatInput from './ChatInput'
import Message from './Message'

const ChatWindow = () => {
  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className="flex-1 overflow-y-auto p-4">
        <Message role='user' message='Hello'/>
        <Message role='assistant' message='Hi, how can I help you today?'/>
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatWindow
