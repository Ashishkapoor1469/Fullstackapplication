const users = [
  { name: "Elon Musk", handle: "@elonmusk", img: 1 },
  { name: "React Dev", handle: "@reactdev", img: 5 },
  { name: "Next.js", handle: "@nextjs", img: 8 },
  { name: "Vercel", handle: "@vercel", img: 12 },
  { name: "Tailwind CSS", handle: "@tailwindcss", img: 20 },
];

const types = ["like", "follow", "reply", "repost"];

const messages = {
  like: "liked your tweet",
  follow: "followed you",
  reply: "replied to your tweet",
  repost: "reposted your tweet",
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateNotification = () => {
  const user = rand(users);
  const type = rand(types);

  return {
    id: Date.now(),
    type,
    user: user.name,
    handle: user.handle,
    avatar: `https://i.pravatar.cc/150?img=${user.img}`,
    content: messages[type],
    time: "now",
    mention: Math.random() > 0.6, 
  };
};
