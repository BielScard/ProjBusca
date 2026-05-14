const { logError } = require('../logger');

class Chave {
    #termo;
    #peso;

    constructor(termo, peso = 1){
        this.termo = termo;
        this.peso = peso;
    }

    get termo(){
        return this.#termo;
    }

    get peso(){
        return this.#peso;
    }

    set termo(entrada){
        if (typeof entrada !== 'string' || entrada.trim() === '' || entrada.includes(' ')) {
            const error = new Error("palavra-chave deve ser uma única palavra");
            logError(error, 'Chave.set termo');
            throw error;
        }
        this.#termo = entrada;
    }

    set peso(valor){
        if (typeof valor !== 'number' || valor <= 0) {
            const error = new Error('peso da chave deve ser um número maior que zero');
            logError(error, 'Chave.set peso');
            throw error;
        }
        this.#peso = valor;
    }

    toObject() {
        return {
            termo: this.termo,
            peso: this.peso,
        };
    }
}

module.exports = Chave;
