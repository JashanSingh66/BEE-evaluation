import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle input field change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Corrected to target 'name' instead of 'username'
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Send the registration request to the backend
    const res = await fetch('http://localhost:5000/users/register', {
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Changed name="name" to name="username" */}
        <input name="username" placeholder="Username" onChange={handleChange} />  
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
