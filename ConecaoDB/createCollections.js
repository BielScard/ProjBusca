const Busca = require('../Classes/Busca');
const Chave = require('../Classes/Chave');
const Website = require('../Classes/Website');

const {
  insertBusca,
  insertChave,
  insertWebsite,
  closeConnection,
} = require('..');
const { getDb } = require('../db');

//Criando as coleções e inserindo documentos de exemplo para testes iniciais
async function createCollections() {
  try {
    const db = await getDb();

    const collectionNames = ['buscas', 'chaves', 'websites'];
    for (const name of collectionNames) {
      const existing = await db.listCollections({ name }).toArray();
      if (existing.length === 0) {
        await db.createCollection(name);
        console.log(`Coleção '${name}' criada.`);
      } else {
        console.log(`Coleção '${name}' já existe.`);
      }
    }

    const demoBusca = new Busca('pesquisa exemplo', 1);
    const demoChave = new Chave('nodejs', 5);
    const demoWebsite = new Website(
      'Exemplo de site',
      'https://example.com',
      'Um site de exemplo criado para MongoDB.',
      'imagem.png',
      [demoChave]
    );

    await insertBusca(demoBusca.toObject());
    await insertChave(demoChave.toObject());
    await insertWebsite(demoWebsite.toObject());

    console.log('Documentos de exemplo inseridos em cada coleção.');
  } catch (error) {
    console.error('Erro ao criar coleções:', error);
  } finally {
    await closeConnection();
  }
}

createCollections();
