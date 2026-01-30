export default function TweetSkeleton() {
  return (
    <div className="animate-pulse border-b border-gray-800 px-4 py-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-gray-700" />

        <div className="flex-1 space-y-2">
          {/* Name + username */}
          <div className="flex gap-2">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </div>

          {/* Content lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          {/* Image placeholder */}
          <div className="mt-3 h-48 w-full rounded-xl bg-gray-700" />

          {/* Actions */}
          <div className="mt-3 flex justify-between max-w-md">
            <div className="h-4 w-10 bg-gray-700 rounded" />
            <div className="h-4 w-10 bg-gray-700 rounded" />
            <div className="h-4 w-10 bg-gray-700 rounded" />
            <div className="h-4 w-10 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
