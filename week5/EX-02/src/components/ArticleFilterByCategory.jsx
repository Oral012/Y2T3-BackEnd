import { useEffect, useState } from 'react';
import axios from 'axios';
export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try{
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try{
      const res = await axios.get('http://localhost:5000/categories');
    }catch (err) {
      console.error(err);
    }
  }
    const applyFilters = () => {
    axios.get(`http://localhost:5000/categories/${selectedCategory}/articles`)
      .then(res => {setArticles(res.data);})
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter"
                value={selectedCategory}
                onChange={(e) =>
                setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilters();
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedCategory('');
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}