const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Serviço de busca Backend - rota de login ativa.',
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`POST http://localhost:${port}/api/login`);
});
