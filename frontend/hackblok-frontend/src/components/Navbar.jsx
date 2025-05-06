import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
        <Link to="/post">Posts</Link>
          <Link to="/create">Create Post</Link>
          <a href="/edit-profile">Edit Profile</a>
          <Link to="/profile">Profile</Link> 
          <button onClick={handleLogout} className='logout-btn'>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
