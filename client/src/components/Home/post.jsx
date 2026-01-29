import { useEffect, useState, useRef } from "react";
import { API } from "../../auth/auth";
import { useAuth } from "../../context/authContext";
import { TweetCard } from "../ui";
import { mapPostToTweet } from "../util/mappost";

export default function PostsFeed() {
  const { token } = useAuth();

  const [posts, setPosts] = useState(() => {
    //  Load posts from sessionStorage if available
    const saved = sessionStorage.getItem("postsFeed");
    return saved ? JSON.parse(saved) : [];
  });

  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem("postsFeedPage");
    return savedPage ? parseInt(savedPage) : 1;
  });

  const [totalPages, setTotalPages] = useState(() => {
    const savedTotal = sessionStorage.getItem("postsFeedTotalPages");
    return savedTotal ? parseInt(savedTotal) : 1;
  });

  const [loading, setLoading] = useState(false);

  const fetchingRef = useRef(false);
  const initialFetchRef = useRef(false);

  //FETCH POSTS
  const fetchPosts = async (pageNum) => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/posts?page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setPosts((prev) => {
          //  Prevent duplicates
          const ids = new Set(prev.map((p) => p._id));
          const uniquePosts = data.posts.filter((p) => !ids.has(p._id));
          const newPosts = [...prev, ...uniquePosts];

          // Save to sessionStorage
          sessionStorage.setItem("postsFeed", JSON.stringify(newPosts));
          return newPosts;
        });

        setTotalPages(data.totalPages);
        sessionStorage.setItem("postsFeedTotalPages", data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  //INITIAL LOAD
  useEffect(() => {
    if (initialFetchRef.current) return;
    initialFetchRef.current = true;

    // ✅ Only fetch if we don't have posts yet
    if (posts.length === 0) {
      fetchPosts(1);
    }
  }, []);

  //SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
      if (fetchingRef.current || page >= totalPages) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const scrolled = ((scrollTop + windowHeight) / docHeight) * 100;

      if (scrolled >= 90) {
        fetchingRef.current = true;
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  // FETCH WHEN PAGE CHANGES 
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
      sessionStorage.setItem("postsFeedPage", page);
    }
  }, [page]);

  
  return (
    <div>
      {posts.map((post) => (
        <TweetCard key={post._id} tweet={mapPostToTweet(post)} />
      ))}

      {loading && (
        <p className="text-center text-gray-400 py-4">
          Loading more posts...
        </p>
      )}

      {!loading && page === totalPages && posts.length > 0 && (
        <p className="text-center text-gray-500 py-4">
          🎉 You’ve reached the end
        </p>
      )}
    </div>
  );
}
