export let users = [
    { id: 1, username: "jashan", email: "jashan@example.com" },
    { id: 2, username: "kunal", email: "kunal@example.com" },
    { id: 3, username: "nazuk", email: "nazuk@example.com" },
    { id: 4, username: "harsh", email: "harsh@example.com" }
];

export let posts = {
    "1": { id: 1, title: "Post 1", content: "This is post 1" },
    "2": { id: 2, title: "Post 2", content: "This is post 2" },
    "3": { id: 3, title: "Post 3", content: "This is post 3" },
    "4": { id: 4, title: "Post 4", content: "This is post 4" },
    "5": { id: 5, title: "Post 5", content: "This is post 5" }
};

export let relationships = [
    { userId: 1, postId: 1 },
    { userId: 2, postId: 2 },
    { userId: 3, postId: 1 },
    { userId: 4, postId: 2 },
    { userId: 1, postId: 3 },
    { userId: 2, postId: 4 },
    { userId: 3, postId: 5 }
];
