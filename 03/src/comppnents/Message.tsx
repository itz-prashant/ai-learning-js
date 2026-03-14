"use client"

type Props = {
  role: "user" | "assistant";
  message: string;
};


const Message = ({message, role}:Props) => {

const isUser = role === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-lg ${isUser ? "bg-white text-black" : "bg-gray-200 text-black"}`}>
        {message}
      </div>
    </div>
  )
}

export default Message
