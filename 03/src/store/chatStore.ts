import { create } from "zustand";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (id: string, content: string)=> void
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

    updateMessage: (id, content) =>
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === id ? { ...msg, content } : msg
        ),
    })),
}));