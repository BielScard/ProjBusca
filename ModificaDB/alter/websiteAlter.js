const { getDb } = require('../../db');
const Website = require('../../Classes/Website');
const { logError } = require('../../logger');

//Função para alterar um website existente no banco de dados
async function alterWebsite(oldData, newData) {
  try {
    const oldWebsite = new Website(
      oldData.titulo,
      oldData.url,
      oldData.descritivo,
      oldData.imagem,
      oldData.chaves || []
    );
    const newWebsite = new Website(
      newData.titulo,
      newData.url,
      newData.descritivo,
      newData.imagem,
      newData.chaves || []
    );
    const db = await getDb();
    return await db.collection('websites').updateOne(
      { url: oldWebsite.url },
      { $set: newWebsite.toObject() }
    );
  } catch (error) {
    logError(error, 'alterWebsite');
    throw error;
  }
}

module.exports = alterWebsite;