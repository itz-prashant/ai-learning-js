import ChatWindow from "@/comppnents/ChatWindow";
import Sidebar from "@/comppnents/Sidebar";


export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
