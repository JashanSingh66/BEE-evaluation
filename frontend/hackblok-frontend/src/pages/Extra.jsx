import React from "react";
import "./styles.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);


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
    <div className="home-container">

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HackBlok</h1>
          <p>Join the best hackathons around the world. Discover, learn, and innovate!</p>
          <button className="cta-button" onClick={() => navigate('/create')}>Create Post</button>
        </div>
      </section>
      

      

 {/* Features Section */}
<section id="features" className="features-section">
  <h2>Key Features</h2>
  <div className="features-list">
    <div className="feature-card">
      <h3>Global Hackathons</h3>
      <img src="../src/assets/world.jpg" alt="Global Hackathons" className="feature-image"/>
      <p>Access hackathons hosted all over the world and participate virtually or in-person.</p>
    </div>
    <div className="feature-card">
      <h3>Real-Time Updates</h3>
      <img src="../src/assets/time.jpg" alt="Real-Time Updates" className="feature-image"/>
      <p>Stay updated with event schedules, announcements, and live streams for all hackathons.</p>
    </div>
    <div className="feature-card">
      <h3>Networking Opportunities</h3>
      <img src="../src/assets/network.jpg" alt="Networking Opportunities" className="feature-image"/>
      <p>Connect with like-minded developers, mentors, and organizations to boost your career.</p>
    </div>
  </div>
</section>



      <div className="posts-preview">
  <h1 className="section-heading"><center>Explore the Content</center></h1>
  <div className="posts-grid">
    {posts.slice(0, 3).map(post => (
      <div key={post._id} className="card post-card">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p><strong>Date:</strong> {post.date}</p>
        <p><strong>Prize:</strong> {post.prize}</p>
        <p><strong>Organizer:</strong> {post.organizer}</p>
        {post.image && (
          <img src={post.image} alt={post.title} className="post-image" />
        )}
      </div>
    ))}
  </div>

  <div className="see-more-wrapper">
    <button className="see-more-button" onClick={() => navigate('/post')}>
      See More Posts
    </button>
  </div>
</div>



<section id="contact">
  <div class="contact-section">
    <h2>Contact Us</h2>
    <div class="contact-cards">
      <div class="contact-card"><h3>Email Us</h3><p><a href="mailto:hackathon@example.com">hackblok@example.com</a></p></div>
      <div class="contact-card"><h3>Call Us</h3><p><a href="tel:+9198765XXXXX">+91 98765 XXXXX</a></p></div>
      <div class="contact-card"><h3>Meet Us</h3><p>New Delhi, India</p></div>
    </div>

  </div>
</section>


      {/* Footer Section */}
      <footer id="footer" className="footer">
        <p>&copy; 2025 HackBlok. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
