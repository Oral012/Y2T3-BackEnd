import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getArticlesByJournalistId } from "../services/api"; 

export default function JournalistArticlesPage() {
  const { id } = useParams(); // Grabs the journalist ID from the URL path

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJournalistArticles();
  }, [id]);

  const fetchJournalistArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticlesByJournalistId(id);
      setArticles(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch articles for this journalist.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading author profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
  
      <h2>
        Articles written by:{" "}
        <span style={{ color: "#007bff" }}>
          {articles.length > 0 ? articles[0].journalist_name : "This Journalist"}
        </span>
      </h2>
      
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px" }}>
        ← Back to Home
      </Link>

      {articles.length === 0 ? (
        <p>This journalist hasn't written any articles yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {articles.map((article) => (
            <div 
              key={article.id} 
              style={{ 
                border: "1px solid #ddd", 
                padding: "15px", 
                borderRadius: "5px" 
              }}
            >
              <h3>{article.title}</h3>
              {/* Show a small snippet of the content */}
              <p>{article.content.substring(0, 150)}...</p> 
              <Link to={`/articles/${article.id}`}>Read Full Article →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}