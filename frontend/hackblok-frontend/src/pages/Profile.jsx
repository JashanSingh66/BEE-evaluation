import { useEffect, useState } from 'react';
import './styles.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Fetch the user profile from the backend
    if (token) {
      fetch('http://localhost:5000/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
