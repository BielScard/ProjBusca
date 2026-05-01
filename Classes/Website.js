class Website {
    #chaves = [];

    constructor(titulo,url,descritivo,imagem){
        this.titulo = titulo;
        this.url = url;
        this.descritivo = descritivo;
        this.imagem = imagem;

    }

    get título(){
        return this.#título;
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

    get chaves()
    {
        return this.#chaves;
    }

    set título(entrada){
        if (!entrada || entrada.lenght < 3){
            throw new Error("Título muito curto ou ausente.");
        }
        this.#titulo = entrada;
    }

    set url(entrada){
        if(!entrada || !entrada.startsWith('http')){
            throw new Error("Url invalida ou ausente");
        }
        this.#url = entrada;
    }

    //descritivo não pode ser ausente ou ser maior que 150 e menor que 3 caracteres
    set descritivo(entrada){
        if (!entrada || entrada.lenght < 3 || entrada.lenght > 150){
            throw new Error("Descrição fora dos conformes");
        }
        this.#descritivo = entrada;
    }

    set imagem(entrada){
        if(!entrada.endsWith('.jpg')||!entrada.endsWith('png')){
            throw new Error("imagem não é do formato correto");
        }
        this.#imagem = entrada;
    }

    set chaves(entradalista){
        if(!(entradalista instanceof Chave)){
            throw new Error("palavras chave são contínuas")
        }

        const jaExiste = this.#chaves.some(c => c.palavra === objetoChave.palavra);

        if(!jaExiste){
            this.#chaves.push(entradalista);
        }
        
    }

    cadastrarSite(dados) {
    const site = new Website();
    try {
        site.titulo = dados.titulo;
    } catch (e) {
        
        const logMsg = `${new Date().toISOString()} - ${e.message}\n`;
        fs.appendFileSync('log_excecoes.txt', logMsg);
        
        console.log("Erro registrado no arquivo log_excecoes.txt");
    }
}

    
}