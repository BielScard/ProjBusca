const fetch = global.fetch || require('node-fetch');

async function run() {
  const adminAuth = Buffer.from('admin@busca.com:admin123').toString('base64');
  const userAuth = Buffer.from('user@busca.com:user123').toString('base64');

  const loginAdmin = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@busca.com', password: 'admin123' }),
  });
  console.log('Admin login', loginAdmin.status, await loginAdmin.json());

  const loginUser = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@busca.com', password: 'user123' }),
  });
  console.log('User login', loginUser.status, await loginUser.json());

  const adminIndex = await fetch('http://localhost:3000/api/websites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${adminAuth}`,
    },
    body: JSON.stringify({
      titulo: 'Admin Site 2',
      url: 'http://adminsite2.com',
      descritivo: 'Admin site indexado',
      imagem: 'http://adminsite2.com/logo.png',
      paragrafo: 'Conteúdo sobre busca e indexação de websites.',
    }),
  });
  console.log('Admin index', adminIndex.status, await adminIndex.json());

  const userIndex = await fetch('http://localhost:3000/api/websites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${userAuth}`,
    },
    body: JSON.stringify({
      titulo: 'User Site 2',
      url: 'http://usersite2.com',
      descritivo: 'Site do usuário comum',
      imagem: 'http://usersite2.com/logo.png',
      paragrafo: 'Conteúdo de teste que não deveria ser indexado por usuário comum.',
    }),
  });
  console.log('User index', userIndex.status, await userIndex.json());
}

run().catch((err) => {
  console.error('Teste falhou:', err);
  process.exit(1);
});
