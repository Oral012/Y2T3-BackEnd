import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const { id } = useParams();

  useEffect(() => {
 // Fetch to prefill a form and update an existing article
  axios.get(`http://localhost:5000/articles/${id}`)
    .then(res=>{
      setForm(res.data);
    })
    .catch(err => console.error(err));

  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    axios.put(`http://localhost:5000/articles/${id}`, form)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
