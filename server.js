const express = require('express');
const { router: authRoutes } = require('./routes/auth');
const searchRoutes = require('./routes/search');
const websiteRoutes = require('./routes/websites');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', websiteRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Serviço de busca Backend - API de busca e indexação de websites.',
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`POST http://localhost:${port}/api/login`);
  console.log(`GET  http://localhost:${port}/api/search?q=termo`);
  console.log(`POST http://localhost:${port}/api/websites`);
});
