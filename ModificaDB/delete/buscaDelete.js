const { getDb } = require('../../db');
const Busca = require('../../Classes/Busca');
const { logError } = require('../../logger');

//Função para deletar uma busca específica da coleção 'buscas' no banco de dados
async function deleteBusca(buscaData) {
  try {
    const busca = new Busca(buscaData.texto, buscaData.peso);
    const db = await getDb();
    return await db.collection('buscas').deleteOne({ texto: busca.texto, peso: busca.peso });
  } catch (error) {
    logError(error, 'deleteBusca');
    throw error;
  }
}

module.exports = deleteBusca;