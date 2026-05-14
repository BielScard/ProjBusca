const insertBusca = require('./ModificaDB/insert/buscaInsert');
const insertChave = require('./ModificaDB/insert/chaveInsert');
const insertWebsite = require('./ModificaDB/insert/websiteInsert');
const deleteBusca = require('./ModificaDB/delete/buscaDelete');
const deleteChave = require('./ModificaDB/delete/chaveDelete');
const deleteWebsite = require('./ModificaDB/delete/websiteDelete');
const alterBusca = require('./ModificaDB/alter/buscaAlter');
const alterChave = require('./ModificaDB/alter/chaveAlter');
const alterWebsite = require('./ModificaDB/alter/websiteAlter');

module.exports = {
  insertBusca,
  insertChave,
  insertWebsite,
  deleteBusca,
  deleteChave,
  deleteWebsite,
  alterBusca,
  alterChave,
  alterWebsite,
};