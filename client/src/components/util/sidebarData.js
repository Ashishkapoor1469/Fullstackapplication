// Random helpers
export const randomItems = (arr, count) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

// Suggested users
export const users = [
  { name: "Elon Musk", handle: "@elonmusk", img: 1 },
  { name: "React Dev", handle: "@reactdev", img: 5 },
  { name: "Next.js", handle: "@nextjs", img: 8 },
  { name: "Vercel", handle: "@vercel", img: 12 },
  { name: "Tailwind CSS", handle: "@tailwindcss", img: 20 },
  { name: "Ashish Kapoor", handle: "@ashish", img: 32 },
  { name: "OpenAI", handle: "@openai", img: 40 },
];

// Trending news / topics
export const trends = [
  { category: "Technology", title: "React 19", posts: "120K" },
  { category: "Trending in India", title: "#JavaScript", posts: "85K" },
  { category: "Web Development", title: "Tailwind CSS", posts: "60K" },
  { category: "AI", title: "OpenAI", posts: "150K" },
  { category: "Startups", title: "Vercel", posts: "32K" },
  { category: "Programming", title: "#MERN", posts: "42K" },
];
