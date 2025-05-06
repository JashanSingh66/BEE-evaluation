import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';
import EditProfile from './pages/EditProfile';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import Extra from './pages/Extra';
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Extra /></ProtectedRoute>} />
        <Route path='/post' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        </Routes>
    </Router>
  );
}
