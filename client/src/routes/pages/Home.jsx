import { useEffect, useRef, useState } from "react";
import { TweetCard } from "../../components/ui";
import { generateTweets } from "../../components/util/genratedummytweet";
import { ImageIcon, Mic, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

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
        <div className="flex justify-between px-2">
          {" "}
          Home
          <div className="md:hidden block">
            <NavLink to="/more">
              <Settings />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Tweet Composer */}
      <div className="p-4 border-b border-gray-800">
        <textarea
          className="w-full bg-black resize-none outline-none text-lg"
          placeholder="What is happening?"
        />
        <div className="flex px-3 justify-between items-center">
          <div className="flex gap-2">
            {" "}
            <ImageIcon />
            <Mic />
          </div>

          <div className="flex justify-end mt-2">
            <button className="bg-[#1DA1F2] px-4 py-1 rounded-full font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
      {/* Tweets */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* Loader Trigger */}
      <div ref={loaderRef} className="md:h-20 h-30 p-2 flex justify-center items-cer">
        {loading && (
          <span className="text-shadow-neutral-300 animate-pulse">
            Loading more tweets…
          </span>
        )}
      </div>
    </div>
  );
}
