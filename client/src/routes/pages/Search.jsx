// src/pages/Search.jsx
export default function Search() {
  return (
    <div>
      <div className="sticky top-0 bg-black p-4 border-b border-gray-800">
        <input
          className="w-full bg-gray-900 p-2 rounded-full outline-none"
          placeholder="Search Twitter"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold mb-4">Trends for you</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Trending</p>
            <p className="font-bold">#ReactJS</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Trending</p>
            <p className="font-bold">#WebDevelopment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
