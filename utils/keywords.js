const STOPWORDS = new Set([
  'de', 'da', 'do', 'dos', 'das', 'e', 'em', 'no', 'na', 'por', 'para', 'com',
  'um', 'uma', 'uns', 'umas', 'que', 'se', 'não', 'mais', 'como', 'os', 'as',
  'ao', 'aos', 'às', 'ou', 'mas', 'pelo', 'pela', 'sobre', 'entre', 'sem',
  'sou', 'são', 'ser', 'foi', 'era', 'está', 'estão', 'esta', 'estas', 'este',
  'estes', 'isso', 'isto', 'aquele', 'aquela', 'aquilo', 'quando', 'onde',
  'porque', 'porquê', 'qual', 'quais', 'quem', 'tem', 'há', 'seu', 'sua',
  'meu', 'minha', 'nos', 'nas', 'pelos', 'pelas'
]);

function normalizeTerm(term) {
  return term
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9áàâãéèêíïóôõúüç]/gi, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function extractKeywords(text, maxTerms = 10) {
  if (typeof text !== 'string') {
    throw new Error('Parágrafo para extração de chaves deve ser uma string.');
  }

  const tokens = text
    .split(/\s+/)
    .map(normalizeTerm)
    .filter(token => token.length >= 3 && !STOPWORDS.has(token));

  const frequency = tokens.reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, maxTerms)
    .map(([termo, count]) => ({ termo, peso: count }));
}

module.exports = { extractKeywords };
