const { getDb, closeConnection } = require('../db');

const email = process.argv[2] || 'teste@exemplo.com';
const password = process.argv[3] || 'senha123';
const name = process.argv[4] || 'Usuário Teste';

(async () => {
  try {
    const db = await getDb();
    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      console.log('Usuário já existe:', existing._id);
    } else {
      const res = await db.collection('users').insertOne({ email, password, name });
      console.log('Usuário inserido, id:', res.insertedId);
    }
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  } finally {
    await closeConnection();
  }
})();
