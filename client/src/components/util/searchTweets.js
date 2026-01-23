const names = [
  "Ashish Kapoor",
  "Rohit Sharma",
  "Ananya Singh",
  "Priya Verma",
  "Dev Patel",
  "Karan Mehta",
  "Sneha Gupta",
];

const handles = [
  "@ashish",
  "@rohit",
  "@ananya",
  "@priya",
  "@dev",
  "@karan",
  "@sneha",
];

const contents = [
  "React is 🔥 for frontend development",
  "Building a Twitter clone with React 🚀",
  "Tailwind CSS makes styling easy 😍",
  "JavaScript everywhere!",
  "Learning full-stack development 💻",
  "Web dev journey is amazing ✨",
];

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateSearchTweets = (count = 10) => {
  return Array.from({ length: count }).map((_, i) => {
    const index = rand(0, names.length - 1);

    return {
      id: i,
      name: names[index],
      handle: handles[index],
      time: `${rand(1, 59)}m`,
      avatar: `https://i.pravatar.cc/150?img=${rand(1, 70)}`,
      content: contents[rand(0, contents.length - 1)],
      likes: rand(0, 5000),
      views: rand(100, 100000),
    };
  });
};

// format numbers → 1.2K / 3.4M
export const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};
