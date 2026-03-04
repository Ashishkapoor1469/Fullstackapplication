// components/Profile/ProfileSkeleton.jsx
export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Cover */}
      <div className="h-40 bg-neutral-800" />

      {/* Profile Info */}
      <div className="p-4">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-neutral-700 border-4 border-black -mt-16" />

        {/* Name + Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-5 w-40 bg-neutral-700 rounded" />
          <div className="h-8 w-20 bg-neutral-700 rounded-full" />
        </div>

        {/* Username */}
        <div className="h-4 w-32 bg-neutral-700 rounded mt-2" />

        {/* Bio */}
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-neutral-700 rounded" />
          <div className="h-4 w-3/4 bg-neutral-700 rounded" />
        </div>

        {/* Followers */}
        <div className="flex gap-6 mt-4">
          <div className="h-4 w-24 bg-neutral-700 rounded" />
          <div className="h-4 w-24 bg-neutral-700 rounded" />
        </div>
      </div>

      {/* Media Tabs */}
      <div className="border-t border-neutral-800">
        <div className="flex gap-6 px-4 py-3">
          <div className="h-4 w-20 bg-neutral-700 rounded" />
          <div className="h-4 w-20 bg-neutral-700 rounded" />
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="space-y-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex gap-3 border-b border-neutral-800 pb-4"
          >
            <div className="w-10 h-10 bg-neutral-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-neutral-700 rounded" />
              <div className="h-4 w-full bg-neutral-700 rounded" />
              <div className="h-4 w-3/4 bg-neutral-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}