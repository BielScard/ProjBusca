const { getDb } = require('../../db');
const Chave = require('../../Classes/Chave');
const { logError } = require('../../logger');

// Função para inserir uma nova chave na coleção 'chaves' do banco de dados
async function insertChave(chaveData) {
  try {
    const chave = new Chave(chaveData.termo, chaveData.peso);
    const db = await getDb();
    return await db.collection('chaves').insertOne(chave.toObject());
  } catch (error) {
    logError(error, 'insertChave');
    throw error;
  }
}

module.exports = insertChave;
