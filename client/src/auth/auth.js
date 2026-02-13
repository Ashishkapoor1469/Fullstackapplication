export const API = import.meta.env.VITE_API_URL;

//POST USER
export const PostUser = async (path, data = {}, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API}/api/auth/${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

//GET USER
export const GetUser = async (path) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/auth/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }
  return res.json();
};

export const SkipLimit = async (path, skip = 0, limit = 5) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API}/api/auth/${path}?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
