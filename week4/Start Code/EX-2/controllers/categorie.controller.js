import {categories} from '../models/data.js';



function getcategories (req, res) {
    res.json(categories);
}

function getCategorie (req, res)  {
    const categorieId = parseInt(req.params.id);
    const categorie = categories.find(u => u.id === categorieId);
    if (!categorie) return res.status(404).json({ error: 'Categorie not found' });
    res.json(categorie);
}

function postCategorie (req, res)  {
 
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newCategorie = {
        id: categories.length + 1,
        name
    };
    categories.push(newCategorie);
    res.status(201).json(newCategorie);
}

function updateCategorie (req, res)  {
    const categorieId = +(req.params.id);
    const { name } = req.body;
    const categorie = categories.find(c => c.id === categorieId);
    if (!categorie) return res.status(404).json({ error: 'Categorie not found' });

    if (name) categorie.name = name;

    res.json(categorie);
}

function deleteCategorie (req, res)  {
    const categorieId = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === categorieId);
    if (index === -1) return res.status(404).json({ error: 'Categorie not found' });

    categories.splice(index, 1);
    res.status(204).send();
}

export default {
    getcategories ,
    getCategorie,
    postCategorie,
    updateCategorie,
    deleteCategorie
};