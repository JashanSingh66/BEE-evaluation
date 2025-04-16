import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });  // Use e.target.name instead of e.target.username
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);  // Store JWT token
      navigate('/');  // Redirect to home page
    } else {
      alert(data.message);  // Show error message
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
