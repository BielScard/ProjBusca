const { getDb } = require('../../db');
const Website = require('../../Classes/Website');
const { logError } = require('../../logger');

//Função para inserir um novo website na coleção 'websites' do banco de dados
async function insertWebsite(websiteData) {
  try {
    const website = new Website(
      websiteData.titulo,
      websiteData.url,
      websiteData.descritivo,
      websiteData.imagem,
      websiteData.chaves || []
    );
    const db = await getDb();
    return await db.collection('websites').insertOne(website.toObject());
  } catch (error) {
    logError(error, 'insertWebsite');
    throw error;
  }
}

module.exports = insertWebsite;
