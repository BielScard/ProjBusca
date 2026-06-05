const { getDb } = require('../../db');
const Website = require('../../Classes/Website');
const Chave = require('../../Classes/Chave');
const { logError } = require('../../logger');

function normalizeChaves(chaves = []) {
  return chaves.map(item => {
    if (item instanceof Chave) {
      return item;
    }
    return new Chave(item.termo, item.peso || 1);
  });
}

//Função para inserir um novo website na coleção 'websites' do banco de dados
async function insertWebsite(websiteData) {
  try {
    const website = new Website(
      websiteData.titulo,
      websiteData.url,
      websiteData.descritivo,
      websiteData.imagem,
      normalizeChaves(websiteData.chaves || [])
    );
    const db = await getDb();
    return await db.collection('websites').insertOne(website.toObject());
  } catch (error) {
    logError(error, 'insertWebsite');
    throw error;
  }
}

module.exports = insertWebsite;
