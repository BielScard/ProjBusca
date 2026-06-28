const express = require('express');
const session = require('express-session');
const { default: MongoStore } = require('connect-mongo');
const { router: authRoutes } = require('./routes/auth');
const searchRoutes = require('./routes/search');
const websiteRoutes = require('./routes/websites');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://conectado:supersenha@backend.otaeomp.mongodb.net/?appName=Backend';
const mongoDbName = process.env.MONGODB_DB_NAME || 'Backend';

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'troque-esta-chave-em-producao',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri,
    dbName: mongoDbName,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
}));

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
  console.log(`POST http://localhost:${port}/api/logout`);
  console.log(`GET  http://localhost:${port}/api/search?q=termo`);
  console.log(`POST http://localhost:${port}/api/websites`);
});
