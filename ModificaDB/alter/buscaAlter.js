const { getDb } = require('../../db');
const Busca = require('../../Classes/Busca');
const { logError } = require('../../logger');

//Função para alterar um documento de busca existente
async function alterBusca(oldData, newData) {
  try {
    const oldBusca = new Busca(oldData.texto, oldData.peso);
    const newBusca = new Busca(newData.texto, newData.peso);
    const db = await getDb();
    return await db.collection('buscas').updateOne(
      { texto: oldBusca.texto, peso: oldBusca.peso },
      { $set: newBusca.toObject() }
    );
  } catch (error) {
    logError(error, 'alterBusca');
    throw error;
  }
}

module.exports = alterBusca;