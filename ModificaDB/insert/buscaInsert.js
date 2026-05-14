const { getDb } = require('../../db');
const Busca = require('../../Classes/Busca');
const { logError } = require('../../logger');

//Função para inserir um novo documento de busca na coleção 'buscas' do banco de dados
async function insertBusca(buscaData) {
  try {
    const busca = new Busca(buscaData.texto, buscaData.peso);
    const db = await getDb();
    return await db.collection('buscas').insertOne(busca.toObject());
  } catch (error) {
    logError(error, 'insertBusca');
    throw error;
  }
}

module.exports = insertBusca;
