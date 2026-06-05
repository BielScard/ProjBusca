const express = require('express');
const router = express.Router();
const Chave = require('../Classes/Chave');
const { extractKeywords } = require('../utils/keywords');
const insertWebsite = require('../ModificaDB/insert/websiteInsert');
const { authenticateAdmin } = require('./auth');

router.post('/websites', authenticateAdmin, async (req, res) => {
  const { titulo, url, descritivo, imagem, paragrafo } = req.body;

  if (!titulo || !url || !descritivo || !imagem || !paragrafo) {
    return res.status(400).json({
      error: 'Os campos titulo, url, descritivo, imagem e paragrafo são obrigatórios.',
    });
  }

  try {
    const chavesExtraidas = extractKeywords(paragrafo);

    if (!chavesExtraidas.length) {
      return res.status(400).json({
        error: 'Não foi possível extrair chaves válidas do parágrafo fornecido.',
      });
    }

    const chaves = chavesExtraidas.map(item => new Chave(item.termo, item.peso));

    const websiteData = {
      titulo,
      url,
      descritivo,
      imagem,
      chaves,
    };

    const result = await insertWebsite(websiteData);

    return res.status(201).json({
      message: 'Website indexado com sucesso.',
      insertedId: result.insertedId,
      chaves: chavesExtraidas,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Não foi possível indexar o website.',
      details: error.message,
    });
  }
});

module.exports = router;
