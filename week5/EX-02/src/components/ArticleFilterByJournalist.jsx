import { useEffect, useState } from 'react';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
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

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try{
      const res = await axios.get('http://localhost:5000/journalists');
    } catch (err) {
      console.error(err);
    }
  };

    const applyFilters = () => {
    axios.get(`http://localhost:5000/journalists/${selectedJournalist}/articles`)
      .then(res => {setArticles(res.data);})
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
                value={selectedJournalist}
                onChange={(e) =>
                setSelectedJournalist(e.target.value)}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          
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
            setSelectedJournalist('');
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