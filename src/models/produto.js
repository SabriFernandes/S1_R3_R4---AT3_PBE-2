export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;

    constructor(pId, pIdCategoria, pNome, pValor, pCaminhoImagem) {
        this.id = pId
        this.IdCategoria = pIdCategoria
        this.nome = pNome
        this.valor = pValor
        this.caminhoImagem = pCaminhoImagem
    }
    //Get para passar
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value); //Validar 
        this.#id = value
    }
    get IdCategoria() {
        return this.#idCategoria
    }
    set IdCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value
    }
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }
    get valor() {
        return this.#valor
    }
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }
    get caminhoImagem() {
        return this.#caminhoImagem
    }
    set caminhoImagem(value) {
        this.#caminhoImagem = value;
    }
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado')
        }
    }
    #validarIdCategoria(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado')
        }
    }
    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatorio e deve ter entre 3 a 45 caracteres')
        }
    }
    #validarValor(value) {
        if (value === null || value === undefined || isNaN(value)) {
            throw new Error('O campo valor é obrigatório e deve ser um número')
        }
    }
    #validarCaminhoImagem(value) {
        if (!value || value.trim() === '') {
            throw new Error('O caminho da imagem é obrigatório')
        }
    }
    static criar(dados) { //Cria uma nova instancia do produto
        return new Produto(null, dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem);
    }
    static alterar(dados, id) {//Altera a instancia do produto
        return new Produto(dados.nome, dados.valor, id);
    }
}