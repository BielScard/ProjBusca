const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://conectado:supersenha@backend.otaeomp.mongodb.net/?appName=Backend';
const dbName = process.env.MONGODB_DB_NAME || 'Backend';
const client = new MongoClient(uri);

let connectedDb = null;


//Função para obter a conexão com o banco de dados
async function getDb() {
  if (!connectedDb) {
    await client.connect();
    connectedDb = client.db(dbName);
  }
  return connectedDb;
}

async function closeConnection() {
  if (client) {
    await client.close();
    connectedDb = null;
  }
}

module.exports = {
  getDb,
  closeConnection,
};
