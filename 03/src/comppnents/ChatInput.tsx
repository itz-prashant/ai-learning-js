import React from 'react'

const ChatInput = () => {
  return (
    <div className='border-t p-4'>
      <input 
        type="text"
        placeholder='Send a message....'
        className='w-full border rounded-lg px-4 py-2  outline-none'
       />
    </div>
  )
}

export default ChatInput
