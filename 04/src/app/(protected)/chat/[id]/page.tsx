import Sidebar from "@/components/Sidebar";

export default function ChatPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-[90vh]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* messages */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="p-2 bg-neutral-700 rounded w-fit">
            Hello (user)
          </div>

          <div className="p-2 bg-black text-white rounded w-fit">
            Hi (AI)
          </div>
        </div>

        {/* input */}
        <div className="p-4 border-t flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="Type message..."
          />
          <button className="bg-black text-white px-4 rounded cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}