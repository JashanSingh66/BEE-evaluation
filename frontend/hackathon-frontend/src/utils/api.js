const BASE_URL = "http://localhost:5000/api"; // update if your backend port is different

export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw await res.json();
    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw await res.json();
    return res.json();
};

export const fetchPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) throw await res.json();
    return res.json();
};
