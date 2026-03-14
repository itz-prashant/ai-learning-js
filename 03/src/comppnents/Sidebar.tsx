import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-72 border-r h-full p-4'>
      <button className="w-full bg-neutral-500 text-white py-2 rounded-lg mb-4 cursor-pointer">
        + New Chat
      </button>

      <div className="space-y-1">
        <div className="p-2 rounded hover:bg-neutral-500 cursor-pointer">
          Chat 1
        </div>

        <div className="p-2 rounded hover:bg-neutral-500 cursor-pointer">
          Chat 2
        </div>
      </div>
    </div>
  )
}

export default Sidebar
