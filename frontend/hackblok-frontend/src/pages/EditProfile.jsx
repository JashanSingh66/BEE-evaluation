import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [form, setForm] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/users/profile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setForm({ username: data.profile.username, email: data.profile.email });
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Profile updated successfully!');
      navigate('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h1>Edit Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
