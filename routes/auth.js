const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados de entrada
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email e senha são obrigatórios para o login.',
    });
  }

  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: 'Credenciais inválidas. Verifique seu email e senha.',
      });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      user: {
        id: user._id,
        name: user.name || null,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao validar login:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar o login.',
    });
  }
});

module.exports = router;
