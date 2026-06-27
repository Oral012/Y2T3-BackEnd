//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import  {pool}  from "../utils/database.js";
// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query(`SELECT a.*, j.name AS journalist_name
        FROM articles as a
        LEFT JOIN journalists as j ON a.journalist_id = j.id`);
    console.log(rows);
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query(`SELECT a.*, j.name AS journalist_name, j.email AS journalist_email, j.bio AS journalist_bio
        FROM articles as a
        LEFT JOIN journalists as j ON a.journalist_id = j.id
        WHERE a.id = ?`, [id]);
    return rows[0]; 
}

export async function getArticlesByJournalistId(journalistId) {
    const [rows] = await pool.query(`
        SELECT a.*, j.name AS journalist_name
        FROM articles as a
        INNER JOIN journalists as j ON a.journalist_id = j.id
        WHERE a.journalist_id = ?
    `, [journalistId]);
    return rows;
}
// Create a new article
export async function createArticle(article) {
    // TODO
    const {title, content, journalist, category} = article;
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
        [title, content, journalist, category]
    );
    return getArticleById(result.insertId);
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const {title, content, journalist, category} = updatedData;
    const result = await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?",
        [title, content, journalist, category, id]
    );
    return getArticleById(id);
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const result = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return getArticleById(id);
}
