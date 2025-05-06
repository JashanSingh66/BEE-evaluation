import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/users/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserId(data.profile._id);
    };

    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/posts');
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setPosts(posts.filter(post => post._id !== id));
      alert('Post deleted!');
    } else {
      alert(data.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div className="container">
      <h1>Explore the Content</h1>
      {posts.map(post => (
        <div key={post._id} className="card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Date:</strong> {post.date}</p>
          <p><strong>Prize:</strong> {post.prize}</p>
          <p><strong>Organizer:</strong> {post.organizer}</p>

          {/* Display the image if it exists */}
          {post.image && (
            <img src={post.image} alt={post.title} className="post-image" />
          )}

          {post.createdBy === userId && (
            <div className="actions">
              <button onClick={() => handleEdit(post._id)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
