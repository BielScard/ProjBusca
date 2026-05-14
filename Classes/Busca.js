const { logError } = require('../logger');

class Busca {
    #texto;
    #peso;

    constructor(texto, peso = 0){
        this.texto = texto;
        this.peso = peso;
    }

    get texto(){
        return this.#texto;
    }

    set texto(entrada){
        if(!entrada){
            const error = new Error("Procura vazia");
            logError(error, 'Busca.set texto');
            throw error;
        }
        this.#texto = entrada;
    }

    get peso(){
        return this.#peso;
    }

    set peso(valor){
        if (typeof valor !== 'number' || valor < 0) {
            const error = new Error('Peso inválido. Deve ser um número maior ou igual a zero.');
            logError(error, 'Busca.set peso');
            throw error;
        }
        this.#peso = valor;
    }

    extrairChaves(entrada){
        return typeof entrada === 'string' ? entrada.split(' ') : [];
    }

    levenshtein(a, b) {
        const matriz = [];
        for (let i = 0; i <= a.length; i++) {
            matriz[i] = [i];
        }
        for (let j = 0; j <= b.length; j++) {
            matriz[0][j] = j;
        }
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const custo = a[i - 1] === b[j - 1] ? 0 : 1;
                matriz[i][j] = Math.min(
                    matriz[i - 1][j] + 1,
                    matriz[i][j - 1] + 1,
                    matriz[i - 1][j - 1] + custo
                );
            }
        }
        return matriz[a.length][b.length];
    }

    calcularPorcentagem(p1, p2) {
        const distancia = this.levenshtein(p1.toLowerCase(), p2.toLowerCase());
        const maiorComprimento = Math.max(p1.length, p2.length);
        if (maiorComprimento === 0) return 100;
        return Number((1 - distancia / maiorComprimento) * 100).toFixed(2);
    }

    toObject() {
        return {
            texto: this.texto,
            peso: this.peso,
        };
    }
}

module.exports = Busca;
