const { getDb } = require('./db');
const { logError } = require('./logger');

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildRegex(value) {
  return new RegExp(escapeRegex(value.trim()), 'i');
}

function normalizeSearchValue(value) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }
  return null;
}

async function searchBuscas(query) {
  try {
    const filter = {};

    if (typeof query === 'object' && query !== null) {
      if (normalizeSearchValue(query.texto)) {
        filter.texto = buildRegex(query.texto);
      }
      if (typeof query.peso === 'number') {
        filter.peso = query.peso;
      }
    } else {
      const texto = normalizeSearchValue(query);
      if (!texto) {
        throw new Error('Pesquisa de buscas deve conter texto válido');
      }
      filter.texto = buildRegex(texto);
    }

    if (!Object.keys(filter).length) {
      throw new Error('Pesquisa de buscas não possui critérios válidos');
    }

    const db = await getDb();
    return await db.collection('buscas')
      .find(filter)
      .sort({ peso: -1, texto: 1 })
      .toArray();
  } catch (error) {
    logError(error, 'Search.searchBuscas');
    throw error;
  }
}

async function searchChaves(query) {
  try {
    const filter = {};

    if (typeof query === 'object' && query !== null) {
      if (normalizeSearchValue(query.termo)) {
        filter.termo = buildRegex(query.termo);
      }
      if (typeof query.peso === 'number') {
        filter.peso = query.peso;
      }
    } else {
      const termo = normalizeSearchValue(query);
      if (!termo) {
        throw new Error('Pesquisa de chaves deve conter termo válido');
      }
      filter.termo = buildRegex(termo);
    }

    if (!Object.keys(filter).length) {
      throw new Error('Pesquisa de chaves não possui critérios válidos');
    }

    const db = await getDb();
    return await db.collection('chaves')
      .find(filter)
      .sort({ peso: -1, termo: 1 })
      .toArray();
  } catch (error) {
    logError(error, 'Search.searchChaves');
    throw error;
  }
}

function buildWebsiteFilter(query) {
  const trimmed = normalizeSearchValue(query);
  if (!trimmed) {
    throw new Error('Pesquisa de websites deve conter texto válido');
  }

  const regex = buildRegex(trimmed);
  return {
    $or: [
      { titulo: regex },
      { url: regex },
      { descritivo: regex },
      { 'chaves.termo': regex },
    ],
  };
}

async function searchWebsites(query) {
  try {
    const filter = {};

    if (typeof query === 'object' && query !== null) {
      const conditions = [];
      if (normalizeSearchValue(query.titulo)) {
        conditions.push({ titulo: buildRegex(query.titulo) });
      }
      if (normalizeSearchValue(query.url)) {
        conditions.push({ url: buildRegex(query.url) });
      }
      if (normalizeSearchValue(query.descritivo)) {
        conditions.push({ descritivo: buildRegex(query.descritivo) });
      }
      if (normalizeSearchValue(query.termo)) {
        conditions.push({ 'chaves.termo': buildRegex(query.termo) });
      }
      if (conditions.length) {
        filter.$or = conditions;
      }
    } else {
      Object.assign(filter, buildWebsiteFilter(query));
    }

    if (!Object.keys(filter).length) {
      throw new Error('Pesquisa de websites não possui critérios válidos');
    }

    const db = await getDb();
    return await db.collection('websites')
      .find(filter)
      .sort({ titulo: 1 })
      .toArray();
  } catch (error) {
    logError(error, 'Search.searchWebsites');
    throw error;
  }
}

async function searchAll(query) {
  try {
    const [buscas, chaves, websites] = await Promise.all([
      searchBuscas(query),
      searchChaves(query),
      searchWebsites(query),
    ]);

    return {
      buscas,
      chaves,
      websites,
    };
  } catch (error) {
    logError(error, 'Search.searchAll');
    throw error;
  }
}

module.exports = {
  searchBuscas,
  searchChaves,
  searchWebsites,
  searchAll,
};
