import { useEffect, useRef, useState } from "react";
import { TweetCard } from "../../components/ui";
import { generateTweets } from "../../components/util/genratedummytweet";

export default function Feed() {
  const [tweets, setTweets] = useState(() => generateTweets(10, 0));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMoreTweets = () => {
    setLoading(true);
    setTimeout(() => {
      setTweets((prev) => [...prev, ...generateTweets(10, prev.length)]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreTweets();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        Home
      </header>

      {/* Tweet Composer */}
      <div className="p-4 border-b border-gray-800">
        <textarea
          className="w-full bg-black resize-none outline-none text-lg"
          placeholder="What is happening?"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-[#1DA1F2] px-4 py-1 rounded-full font-bold">
            Post
          </button>
        </div>
      </div>

      {/* Tweets */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* Loader Trigger */}
      <div ref={loaderRef} className="h-20 flex justify-center items-center">
        {loading && (
          <span className="text-gray-500 animate-pulse">
            Loading more tweets…
          </span>
        )}
      </div>
    </div>
  );
}
