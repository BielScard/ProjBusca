const { getDb } = require('../../db');
const Chave = require('../../Classes/Chave');
const { logError } = require('../../logger');

//Função para alterar um documento na coleção 'chaves' com base em dados antigos e novos
async function alterChave(oldData, newData) {
  try {
    const oldChave = new Chave(oldData.termo, oldData.peso);
    const newChave = new Chave(newData.termo, newData.peso);
    const db = await getDb();
    return await db.collection('chaves').updateOne(
      { termo: oldChave.termo, peso: oldChave.peso },
      { $set: newChave.toObject() }
    );
  } catch (error) {
    logError(error, 'alterChave');
    throw error;
  }
}

module.exports = alterChave;