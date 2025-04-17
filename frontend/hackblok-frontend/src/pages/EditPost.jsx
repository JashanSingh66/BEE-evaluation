import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: '',
    prize: '',
    organizer: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => setForm(data.post))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Post updated successfully!');
      navigate('/myposts');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} />
        <input name="date" placeholder="Date" value={form.date} onChange={handleChange} />
        <input name="prize" placeholder="Prize" value={form.prize} onChange={handleChange} />
        <input name="organizer" placeholder="Organizer" value={form.organizer} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
