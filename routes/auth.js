const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function buildUserPayload(user) {
  return {
    id: user._id,
    email: user.email,
    name: user.name || null,
    role: user.role || 'user',
  };
}

async function authenticateRequest(req, res, next) {
  if (req.session?.user) {
    req.user = req.session.user;
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Autenticação é necessária para acessar este recurso.',
    });
  }

  const encoded = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  } catch (error) {
    return res.status(400).json({ error: 'Cabeçalho Authorization inválido.' });
  }

  const [email, password] = decoded.split(':');

  if (!email || !password) {
    return res.status(400).json({ error: 'Formato de credenciais inválido.' });
  }

  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: 'Credenciais inválidas. Verifique seu email e senha.',
      });
    }

    req.user = buildUserPayload(user);
    return next();
  } catch (error) {
    console.error('Erro ao validar autenticação:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar a autenticação.',
    });
  }
}

async function authenticateAdmin(req, res, next) {
  await authenticateRequest(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Apenas usuários com perfil admin podem indexar websites.',
      });
    }
    return next();
  });
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

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

    req.session.user = buildUserPayload(user);
    req.session.authenticated = true;

    req.session.save((error) => {
      if (error) {
        console.error('Erro ao salvar a sessão:', error);
        return res.status(500).json({
          error: 'Erro interno ao criar a sessão.',
        });
      }

      return res.status(200).json({
        message: 'Login realizado com sucesso.',
        user: req.session.user,
        auth: 'A sessão foi criada para acessar os recursos restritos.',
      });
    });
  } catch (error) {
    console.error('Erro ao validar login:', error);
    return res.status(500).json({
      error: 'Erro interno ao processar o login.',
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Erro ao encerrar a sessão:', error);
      return res.status(500).json({
        error: 'Não foi possível encerrar a sessão.',
      });
    }

    return res.status(200).json({
      message: 'Logout realizado com sucesso.',
    });
  });
});

router.get('/me', (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({
      error: 'Nenhuma sessão ativa.',
    });
  }

  return res.status(200).json({
    user: req.session.user,
  });
});

module.exports = {
  router,
  authenticateRequest,
  authenticateAdmin,
};
