const Chave = require('./Chave');
const { logError } = require('../logger');

class Website {
    #titulo;
    #url;
    #descritivo;
    #imagem;
    #chaves = [];

    constructor(titulo, url, descritivo, imagem, chaves = []){
        this.titulo = titulo;
        this.url = url;
        this.descritivo = descritivo;
        this.imagem = imagem;
        this.chaves = chaves;
    }

    get titulo(){
        return this.#titulo;
    }

    get url(){
        return this.#url;
    }

    get descritivo(){
        return this.#descritivo;
    }

    get imagem(){
        return this.#imagem;
    }

    get chaves() {
        return this.#chaves;
    }

    set titulo(entrada){
        if (!entrada || entrada.length < 3){
            const error = new Error("Título muito curto ou ausente.");
            logError(error, 'Website.set titulo');
            throw error;
        }
        this.#titulo = entrada;
    }

    set url(entrada){
        if(!entrada || !entrada.startsWith('http')){
            const error = new Error("Url inválida ou ausente");
            logError(error, 'Website.set url');
            throw error;
        }
        this.#url = entrada;
    }

    set descritivo(entrada){
        if (!entrada || entrada.length < 3 || entrada.length > 150){
            const error = new Error("Descrição fora dos conformes");
            logError(error, 'Website.set descritivo');
            throw error;
        }
        this.#descritivo = entrada;
    }

    set imagem(entrada){
        if (typeof entrada !== 'string' || (!entrada.endsWith('.jpg') && !entrada.endsWith('.png'))){
            const error = new Error("imagem não é do formato correto");
            logError(error, 'Website.set imagem');
            throw error;
        }
        this.#imagem = entrada;
    }

    set chaves(entradalista){
        if (!Array.isArray(entradalista)) {
            const error = new Error("chaves deve ser um array de Chave");
            logError(error, 'Website.set chaves');
            throw error;
        }
        this.#chaves = [];
        entradalista.forEach(item => this.addChave(item));
    }

    addChave(chave){
        if (!(chave instanceof Chave)){
            const error = new Error("palavra chave inválida");
            logError(error, 'Website.addChave');
            throw error;
        }
        const jaExiste = this.#chaves.some(c => c.termo === chave.termo);
        if(!jaExiste){
            this.#chaves.push(chave);
        }
    }

    toObject() {
        return {
            titulo: this.titulo,
            url: this.url,
            descritivo: this.descritivo,
            imagem: this.imagem,
            chaves: this.chaves.map(c => c.toObject()),
        };
    }
}

module.exports = Website;
