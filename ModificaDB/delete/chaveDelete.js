const { getDb } = require('../../db');
const Chave = require('../../Classes/Chave');
const { logError } = require('../../logger');

//Função para deletar uma chave do banco de dados
async function deleteChave(chaveData) {
  try {
    const chave = new Chave(chaveData.termo, chaveData.peso);
    const db = await getDb();
    return await db.collection('chaves').deleteOne({ termo: chave.termo, peso: chave.peso });
  } catch (error) {
    logError(error, 'deleteChave');
    throw error;
  }
}

module.exports = deleteChave;