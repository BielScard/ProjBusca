const express = require("express")
const { MongoClient } = require('mongodb');
const fs = require('fs');

const app = express()

app.get('/',(req, res) => {
    res.json({message: 'Inicial'})
})

app.get('/home',(req, res) => {
    res.json({message: 'Home'})
})
//conexão mongodb tentativa1

/*
const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://bielthekill:<maslei10>@backend.otaeomp.mongodb.net/Backend?appName=Backend');

async function run(){
    await client.connect();
    const db = client.db('meu-banco');
    const collection = db.collection('usuarios');
    const usuarios = await collection.find({}).toArray();
    console.log(usuarios);
    console.log('conectado ao BD');
}

run();
*/

//conexão mongodb tentativa2

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bielthekill:maslei10@backend.otaeomp.mongodb.net/Backend?appName=Backend";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

//conexão mongodb tentativa3

const uri = "mongodb+srv://conectado:supersenha@backend.otaeomp.mongodb.net/?appName=Backend";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado com sucesso!");
    } catch (error) {
        // Grava o erro no arquivo de log como pedido no critério de avaliação
        const logMessage = `${new Date().toISOString()} - Erro: ${error.message}\n`;
        fs.appendFileSync('error.log', logMessage);
        
        console.error("Erro de autenticação ou conexão. Verifique o arquivo error.log");
    }
}

function salvarLog(erro) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaLog = `[${dataHora}] ERRO: ${erro.message}\n`;
    
    // Grava no arquivo 'error.log'. Se não existir, ele cria automaticamente.
    fs.appendFileSync('error.log', linhaLog);
}

connectDB();
//conexão ainda está dando erro
app.listen(3000)