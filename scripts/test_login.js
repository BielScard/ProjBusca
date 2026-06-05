(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'teste@exemplo.com', password: 'senha123' })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Body:', data);
  } catch (err) {
    console.error('Erro na requisição de login:', err);
  }
})();
