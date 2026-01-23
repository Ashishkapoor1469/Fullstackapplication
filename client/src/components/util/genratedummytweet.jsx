const names = [
  "Ashish Kapoor",
  "Rohit Sharma",
  "Ananya Singh",
  "Priya Verma",
  "Karan Mehta",
  "Neha Gupta",
  "Arjun Malhotra",
  "Simran Kaur",
  "Aditya Jain",
  "Pooja Patel",
];

const contents = [
  "Building a Twitter (X) clone with React 🚀",
  "Learning MERN stack step by step 💻",
  "Tailwind CSS makes UI so clean ✨",
  "Debugging at 2 AM hits different 😵‍💫",
  "Just deployed my project on Vercel 🔥",
  "Express + MongoDB = ❤️",
  "Framer Motion animations are insane 😍",
  "DSA grind never stops 📚",
  "Working on authentication flows 🔐",
  "Full-stack development is fun 😎",
];

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomItem = (arr) => arr[rand(0, arr.length - 1)];

export const generateTweets = (count = 10, start = 0) => {
  return Array.from({ length: count }).map((_, i) => {
    const name = randomItem(names);

    const handle =
      "@" +
      name.toLowerCase().replace(/\s+/g, "") +
      rand(10, 9999);

    const hasImage = Math.random() > 0.6;

    return {
      id: start + i,
      name,
      handle,
      time: `${rand(1, 59)}m`,
      avatar: `https://i.pravatar.cc/150?img=${rand(1, 70)}`,
      content: randomItem(contents),

      image: hasImage
        ? `https://picsum.photos/600/400?random=${start + i}`
        : null,

      // ✅ RANDOM STATS
      comments: rand(0, 500),
      reposts: rand(0, 300),
      likes: rand(0, 5000),
      views: rand(100, 100000),
      bookmarks: rand(0, 200),
    };
  });
};
