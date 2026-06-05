const { getDb, closeConnection } = require('../db');
const Website = require('../Classes/Website');
const Chave = require('../Classes/Chave');
const { extractKeywords } = require('../utils/keywords');

const users = [
  { email: 'admin@busca.com', password: 'admin123', name: 'Administrador', role: 'admin' },
  { email: 'user@busca.com', password: 'user123', name: 'Usuário Comum', role: 'user' },
];

const websites = [
  {
    titulo: 'Busca Fácil',
    url: 'http://buscafacil.com',
    descritivo: 'Portal de busca inteligente para conteúdos técnicos e tutoriais.',
    imagem: 'http://buscafacil.com/logo.jpg',
    paragrafo: 'A Busca Fácil oferece resultados rápidos para tecnologia, programação, backend e frontend.',
  },
  {
    titulo: 'Dicas de Desenvolvimento',
    url: 'http://dicasdev.com',
    descritivo: 'Blog com artigos sobre desenvolvimento web e boas práticas.',
    imagem: 'http://dicasdev.com/banner.jpg',
    paragrafo: 'Encontre artigos sobre JavaScript, Node.js, APIs REST, segurança e performance.',
  },
  {
    titulo: 'Portal de Pesquisas',
    url: 'http://portalpesquisa.com',
    descritivo: 'Serviço de pesquisa para estudo de mercado e análise de dados.',
    imagem: 'http://portalpesquisa.com/logo.jpg',
    paragrafo: 'O Portal de Pesquisas mostra relatórios, tendências e ferramentas de análise de dados.',
  },
];

const chaves = [
  { termo: 'tecnologia', peso: 5 },
  { termo: 'programação', peso: 4 },
  { termo: 'backend', peso: 3 },
  { termo: 'frontend', peso: 2 },
  { termo: 'api', peso: 4 },
  { termo: 'segurança', peso: 2 },
  { termo: 'performance', peso: 2 },
  { termo: 'dados', peso: 3 },
];

const buscas = [
  { texto: 'node.js', peso: 10 },
  { texto: 'busca inteligente', peso: 8 },
  { texto: 'análise de dados', peso: 6 },
  { texto: 'segurança web', peso: 5 },
];

async function seed() {
  const db = await getDb();

  console.log('Populando coleção de usuários...');
  for (const user of users) {
    const { email, password, name, role } = user;
    await db.collection('users').updateOne(
      { email },
      {
        $setOnInsert: { email, password, name },
        $set: { role },
      },
      { upsert: true }
    );
  }

  await db.collection('users').updateMany(
    { role: { $exists: false } },
    { $set: { role: 'user' } }
  );

  console.log('Populando coleção de websites...');
  for (const item of websites) {
    const extracted = extractKeywords(item.paragrafo);
    const website = new Website(
      item.titulo,
      item.url,
      item.descritivo,
      item.imagem,
      extracted.map(tag => new Chave(tag.termo, tag.peso))
    );

    await db.collection('websites').updateOne(
      { url: item.url },
      { $set: website.toObject() },
      { upsert: true }
    );
  }

  console.log('Populando coleção de chaves...');
  for (const chave of chaves) {
    await db.collection('chaves').updateOne(
      { termo: chave.termo },
      { $setOnInsert: chave },
      { upsert: true }
    );
  }

  console.log('Populando coleção de buscas...');
  for (const busca of buscas) {
    await db.collection('buscas').updateOne(
      { texto: busca.texto },
      { $setOnInsert: busca },
      { upsert: true }
    );
  }

  console.log('Seed concluída.');
}

seed()
  .then(async () => {
    await closeConnection();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Erro ao popular banco:', error);
    await closeConnection();
    process.exit(1);
  });
