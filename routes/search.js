const express = require('express');
const router = express.Router();
const { searchWebsites } = require('../Search');

router.get('/search', async (req, res) => {
  const query = req.query.q || req.body.q;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      error: 'O termo de busca é obrigatório. Use ?q=termo ou { "q": "termo" } no corpo.',
    });
  }

  try {
    const results = await searchWebsites(query);
    return res.status(200).json({
      query: query.trim(),
      results,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao processar a busca.',
      details: error.message,
    });
  }
});

module.exports = router;
