import React, { useEffect, useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    return (
        <div className="home-container">
            <h1>All Hackathons</h1>
            <div className="posts-grid">
                {posts.map(post => (
                    <div key={post._id} className="post-card">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>Date: {post.date}</small>
                        <small>Prize: {post.prize}</small>
                        <small>Organizer: {post.organizer}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
