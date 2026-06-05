const { getDb, closeConnection } = require('../db');

const email = process.argv[2] || 'teste@exemplo.com';
const password = process.argv[3] || 'senha123';
const name = process.argv[4] || 'Usuário Teste';
const role = process.argv[5] || 'user';

(async () => {
  try {
    const db = await getDb();
    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      console.log('Usuário já existe:', existing._id);
      if (!existing.role) {
        await db.collection('users').updateOne(
          { email },
          { $set: { role } }
        );
        console.log('Role atualizada para:', role);
      }
    } else {
      const res = await db.collection('users').insertOne({ email, password, name, role });
      console.log('Usuário inserido, id:', res.insertedId);
    }
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  } finally {
    await closeConnection();
  }
})();
