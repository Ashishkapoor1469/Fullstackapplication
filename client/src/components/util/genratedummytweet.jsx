export const generateTweets = (count = 10, start = 0) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: start + i,
    name: "Ashish Kapoor",
    handle: "@ashish",
    time: `${Math.floor(Math.random() * 59) + 1}m`,
    avatar: `https://i.pravatar.cc/150?img=${(start + i) % 70}`,
    content: "Building a Twitter (X) clone with React 🚀",
    image:
      Math.random() > 0.6
        ? "https://source.unsplash.com/random/600x400?tech"
        : null,
  }));
};
