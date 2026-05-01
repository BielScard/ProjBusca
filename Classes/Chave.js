class Chave {
    constructor(termo,peso){
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
        if(entrada.includes(' ')){
            throw new Error("palavras chave são contínuas")
        }
        this.#termo = entrada;
    }

    set peso(entrada){
        if(!entrada>0){
            throw new Error('peso da chave não pode ser zero')
        }
    }


}