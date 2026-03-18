import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-[90vh]">
      <Sidebar />

      <div className="flex-1 h-[80vh] flex items-center justify-center">
        <h1 className="text-gray-500">Start a new chat</h1>
      </div>
    </div>
  );
}