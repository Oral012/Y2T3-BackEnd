import {articles} from '../models/data.js';

function getArticles (req, res) {
    res.json(articles);
}

function getArtic (req, res)  {
    const articId = parseInt(req.params.id);
    const artic = articles.find(u => u.id === articId);
    if (!artic) return res.status(404).json({ error: 'artic not found' });
    res.json(artic);
}

function postArtic (req, res)  {
  
    const { title, content, journalistId, categoryId } = req.body;
    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newartic = {
        id: articles.length + 1,
        title,
        content,
        journalistId,
        categoryId
    };
    articles.push(newartic);
    res.status(201).json(newartic);
}

function updateartic (req, res)  {
    const articId = parseInt(req.params.id);
    const { title, content, journalistId, categoryId } = req.body;
    const artic = articles.find(u => u.id === articId);
    if (!artic) return res.status(404).json({ error: 'artic not found' });

    if (title) artic.title = title;
    if (content) artic.content = content;
    if (journalistId) artic.journalistId = journalistId;
    if (categoryId) artic.categoryId = categoryId;

    res.json(artic);
}

function deleteartic (req, res)  {
    const articId = parseInt(req.params.id);
    const index = articles.findIndex(u => u.id === articId);
    if (index === -1) return res.status(404).json({ error: 'artic not found' });

    articles.splice(index, 1);
    res.status(204).send();
}

export default {
    getArticles,
    getArtic,
    postArtic,
    updateartic,
    deleteartic
}