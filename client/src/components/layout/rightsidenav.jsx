// src/components/RightSidebar.jsx
export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 p-4 sticky top-0 h-screen">
      <input
        className="w-full bg-gray-900 p-2 rounded-full mb-4"
        placeholder="Search"
      />
      <div className="bg-gray-900 p-4 rounded-xl">
        <h3 className="font-bold mb-2">Who to follow</h3>
        <p className="text-sm text-gray-400">Suggested accounts</p>
      </div>
    </aside>
  );
}
