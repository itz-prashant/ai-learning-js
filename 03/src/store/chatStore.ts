import { create } from "zustand";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatState = {
  messages: Message[];
  activeConversationId: string | null;
  setActiveConversation: (id:string)=> void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, content: string)=> void
  setMessages: (messages: Message[]) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
activeConversationId: null,
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

    setActiveConversation: (id) =>
      set(() => ({
        activeConversationId: id,
      })),

    setMessages: (messages) => set({ messages }),  
}));