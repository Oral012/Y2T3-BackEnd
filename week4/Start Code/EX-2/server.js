import express from 'express';
import categorieController from './controllers/categorie.controller.js';
import journalistController from './controllers/journalist.controller.js';
import articleController from './controllers/article.controller.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/categories', categorieController.getcategories);
app.get('/categories/:id', categorieController.getCategorie);
app.post('/categories', categorieController.postCategorie);
app.put('/categories/:id', categorieController.updateCategorie);
app.delete('/categories/:id', categorieController.deleteCategorie);

app.get('/journalists', journalistController.getJournalist);
app.get('/journalists/:id', journalistController.getJournalist);
app.post('/journalists', journalistController.postJournalist);
app.put('/journalists/:id', journalistController.updatJournalist);
app.delete('/journalists/:id', journalistController.deleteJournalist);

app.get('/articles', articleController.getArticles);
app.get('/articles/:id', articleController.getArtic);
app.post('/articles', articleController.postArtic);
app.put('/articles/:id', articleController.updateartic);
app.delete('/articles/:id', articleController.deleteartic);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});