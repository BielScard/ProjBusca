const { getDb, closeConnection } = require('../db');

(async () => {
  try {
    const db = await getDb();
    const users = await db.collection('users').find({}).project({ password: 0 }).toArray();
    console.log('Usuários (sem senha):');
    console.log(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
  } finally {
    await closeConnection();
  }
})();
