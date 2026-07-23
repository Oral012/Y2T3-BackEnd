const express = require('express');
const router = express.Router();
const { searchStudents } = require('./query');

router.get('/scores', async (req, res) => {
  try {
    const { keyword, minScore } = req.query;
    const data = await searchStudents(keyword, minScore);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;