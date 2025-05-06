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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.post.title,
          content: data.post.content,
          date: data.post.date,
          prize: data.post.prize,
          organizer: data.post.organizer,
        });
        setPreview(data.post.image); // Existing image
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('date', form.date);
    formData.append('prize', form.prize);
    formData.append('organizer', form.organizer);
    if (image) formData.append('image', image);

    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} />
        <input name="date" placeholder="Date" type='date' value={form.date} onChange={handleChange} />
        <input name="prize" placeholder="Prize" value={form.prize} onChange={handleChange} />
        <input name="organizer" placeholder="Organizer" value={form.organizer} onChange={handleChange} />
        
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="post-image" />}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
