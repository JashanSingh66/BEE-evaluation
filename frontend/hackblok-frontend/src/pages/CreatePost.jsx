import { useState } from 'react';
import './styles.css';

export default function CreatePost() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: '',
    prize: '',
    organizer: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // 🔍 for preview

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });

      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL); // Show preview
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('date', form.date);
    formData.append('prize', form.prize);
    formData.append('organizer', form.organizer);
    if (form.image) {
      formData.append('image', form.image);
    }

    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
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
        
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {/* ✅ Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        )}

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
