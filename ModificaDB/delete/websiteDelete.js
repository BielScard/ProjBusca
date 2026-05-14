const { getDb } = require('../../db');
const Website = require('../../Classes/Website');
const { logError } = require('../../logger');

//Função para deletar um website do banco de dados
async function deleteWebsite(websiteData) {
  try {
    const website = new Website(
      websiteData.titulo,
      websiteData.url,
      websiteData.descritivo,
      websiteData.imagem,
      websiteData.chaves || []
    );
    const db = await getDb();
    return await db.collection('websites').deleteOne({ url: website.url });
  } catch (error) {
    logError(error, 'deleteWebsite');
    throw error;
  }
}

module.exports = deleteWebsite;