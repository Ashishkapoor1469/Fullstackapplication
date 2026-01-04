const API = import.meta.env.VITE_API_URL;

export const PostUser = async (path, data) => {
  const res = await fetch(`${API}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const GetUser = async (path) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/api/auth/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return res.json();
};
