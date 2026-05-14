const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'error.log');


//Função de armazenamento de erros em um arquivo de log
function logError(error, context = '') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${context} - ${error.message}\n${error.stack}\n\n`;
  fs.appendFileSync(logFile, logMessage);
}

module.exports = { logError };