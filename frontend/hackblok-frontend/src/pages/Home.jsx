import { useEffect, useState } from 'react';
import './styles.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>All Hackathons</h1>
      {posts.map(post => (
        <div key={post._id} className="card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Date:</strong> {post.date}</p>
          <p><strong>Prize:</strong> {post.prize}</p>
          <p><strong>Organizer:</strong> {post.organizer}</p>
        </div>
      ))}
    </div>
  );
}
