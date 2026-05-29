import {journalists} from "../models/data.js";


function getJournalists (req, res) {
    res.json(journalists);
}

function getJournalist (req, res)  {
    const journalistId = parseInt(req.params.id);
    const journalist = journalists.find(u => u.id === journalistId);
    if (!journalist) return res.status(404).json({ error: ' not found' });
    res.json(journalist);
}

function postJournalist (req, res)  {
  
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: journalists.length + 1,
        name,
        email
    };
    journalists.push(newUser);
    res.status(201).json(newUser);
}

function updatJournalist (req, res)  {
    const journalistId = +(req.params.id);
    const { name, email } = req.body;
    const journalist = journalists.find(u => u.id === journalistId);
    if (!journalist) return res.status(404).json({ error: ' not found' });

    if (name) journalist.name = name;
    if (email) journalist.email = email;

    res.json(journalist);
}

function deleteJournalist (req, res)  {
    const journalist = parseInt(req.params.id);
    const index = journalists.findIndex(u => u.id === journalist);
    if (index === -1) return res.status(404).json({ error: ' not found' });

    journalists.splice(index, 1);
    res.status(204).send();
}

export default {
    getJournalists,
    getJournalist,
    postJournalist,
    updatJournalist,
    deleteJournalist
}