class Busca {
    constructor(texto){
        this.texto = texto;
        this.peso = peso;
        

    }

    get texto(){
        return this.#texto;
    }

    set texto(entrada){
        if(!entrada){
            throw new Error("Procura vazia")
        }
        this.#texto = entrada;
    }

    extrairChaves(entrada){
        return entrada.split(' ');
    }
    
    //Lógica de busca que tentei fazer é uma complexa provavelmente deve ser revisitada
    //nesse caso a entrada2 é o array de chaves dado pelo DB
    //procurar como checar cada objeto do array
    procurarChaves(entrada,entrada2[]){
        proximo = (calcularPorcentagem(entrada, entrada2[].termo));
        if(proximo > 60){
            entrada2[].peso = (entrada2[].peso*2);

        }

        saida = entrada2[].sort((a,b) => b-a);
        


        

    }

    //Distância de Levenshtein utilizado aproximadamente no google necessário checar denovo essa parte pois é uma parte do codigo encontrada na internet por quão complicado é

    levenshtein(a, b) {
        const matriz = [];

        // 1. Inicializa a matriz com as distâncias base (comparando com string vazia)
        for (let i = 0; i <= a.length; i++) {
            matriz[i] = [i];
        }
        for (let j = 0; j <= b.length; j++) {
            matriz[0][j] = j;
        }

        // 2. Preenche a matriz comparando letra por letra
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
      // Se as letras forem iguais, custo é 0. Se diferentes, custo é 1.
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;

      matriz[i][j] = Math.min(
        matriz[i - 1][j] + 1,      // Deleção
        matriz[i][j - 1] + 1,      // Inserção
        matriz[i - 1][j - 1] + custo // Substituição
      );
    }
  }

  // O resultado final está na última célula da matriz
  return matriz[a.length][b.length];
}

    calcularPorcentagem(p1, p2) {
        const distancia = levenshtein(p1.toLowerCase(), p2.toLowerCase());
        const maiorComprimento = Math.max(p1.length, p2.length);
  
        if (maiorComprimento === 0) return 100; // Ambas vazias
  
        const similaridade = (1 - distancia / maiorComprimento) * 100;
        return similaridade.toFixed(2) + "%";
}

ColocarBusca(dados) {
    const procura = new Busca();
    try {
        procura.texto = dados.texto;
    } catch (e) {
        
        const logMsg = `${new Date().toISOString()} - ${e.message}\n`;
        fs.appendFileSync('log_excecoes.txt', logMsg);
        
        console.log("Erro registrado no arquivo log_excecoes.txt");
    }
}

}