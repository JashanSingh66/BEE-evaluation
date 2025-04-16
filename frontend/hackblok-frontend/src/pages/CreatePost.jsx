import { useState } from 'react';
import './styles.css';

export default function CreatePost() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: '',
    prize: '',
    organizer: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <h1>Create a Hackathon Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="content" placeholder="Content" onChange={handleChange} />
        <input name="date" type="date" onChange={handleChange} />
        <input name="prize" placeholder="Prize" onChange={handleChange} />
        <input name="organizer" placeholder="Organizer" onChange={handleChange} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
