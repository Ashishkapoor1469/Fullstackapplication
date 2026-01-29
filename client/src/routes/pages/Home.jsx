import { useEffect, useRef, useState } from "react";
import { TweetCard } from "../../components/ui";
import { generateTweets } from "../../components/util/genratedummytweet";
import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import TweetComposer from "../../components/ui/tweetcomposer";

export default function Feed() {
  const [tweets, setTweets] = useState(() => generateTweets(10, 0));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const loadMoreTweets = () => {
    setLoading(true);
    setTimeout(() => {
      setTweets((prev) => [...prev, ...generateTweets(10, prev.length)]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) loadMoreTweets();
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        <div className="flex justify-between px-2">
          Home
          <div className="md:hidden block">
            <NavLink to="/more">
              <Settings />
            </NavLink>
          </div>
        </div>
      </header>

      {/* COMPOSER */}
      <TweetComposer />

      {/* FEED */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* LOADER */}
      <div ref={loaderRef} className="h-32 md:h-20 flex justify-center mt-4">
        {loading && <span className="animate-pulse">Loading more tweets…</span>}
      </div>
    </div>
  );
}
