export class Endereco {
    #id; 
    #cep; 
    #logradouro;
    #numero; 
    #complemento; 
    #bairro; 
    #cidade; 
    #uf; 
    #idCliente; 

    constructor(pCep, pLogadouro, pNumero, pComplemento, pBairro, pCidade, pUf, pIdCliente, pId){
        this.cep = pCep;
        this.logradouro = pLogadouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.bairro = pBairro;
        this.cidade = pCidade;
        this.uf = pUf;
        this.idCliente = pIdCliente;
        this.id = pId;
    }

    // GET e SET
    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get cep(){
        return this.#cep;
    }
    set cep(value){
        this.#validarCep(value);
        this.#cep = value;
    }

    get logradouro(){
        return this.#logradouro;
    }
    set logradouro(value){
        this.#validarLogadouro(value);
        this.#logradouro = value;
    }

    get numero(){
        return this.#numero;
    }
    set numero(value){
        this.#validarNumero(value);
        this.#numero = value;
    }

    get complemento(){
        return this.#complemento;
    }
    set complemento(value){
        this.#validarComplemento(value);
        this.#complemento = value;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(value){
        this.#validarBairro(value);
        this.#bairro = value;
    }

    get cidade(){
        return this.#cidade;
    }
    set cidade(value){
        this.#validarCidade(value);
        this.#cidade = value;
    }

    get uf(){
        return this.#uf;
    }
    set uf(value){
        this.#validarUf(value);
        this.#uf = value;
    }

    get idCliente(){
        return this.#idCliente;
    }
    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    // VALIDAÇÕES
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarCep(value){
        if (!value || value.trim().length !== 8) {
            throw new Error('CEP deve conter exatamente 8 dígitos');
        }
    }

    #validarLogadouro(value){
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('Logradouro deve ter entre 3 e 100 caracteres');
        }
    }

    #validarNumero(value){
        if (!value || value.trim().length === 0) {
            throw new Error('Número é obrigatório');
        }
    }

    #validarComplemento(value){
        if (value && value.trim().length > 100) {
            throw new Error('Complemento deve ter no máximo 100 caracteres');
        }
    }

    #validarBairro(value){
        if (value && value.trim().length > 100) {
            throw new Error('Bairro deve ter no máximo 100 caracteres');
        }
    }

    #validarCidade(value){
        if (!value || value.trim().length < 2 || value.trim().length > 100) {
            throw new Error('Cidade deve ter entre 2 e 100 caracteres');
        }
    }

    #validarUf(value){
        if (!value || value.trim().length !== 2) {
            throw new Error('UF deve conter 2 caracteres');
        }
    }

    #validarIdCliente(value){
        if (value && value <= 0) {
            throw new Error('ID do cliente inválido');
        }
    }
    static criar(dados){
 
        return new Endereco(dados.cep, dados.logradouro, dados.numero, dados.complemento, dados.bairro, dados.cidade, dados.uf, null, null); 
    }

    static alterar(dados, id){
        console.log(dados);
        
        return new Endereco(
            dados.cep,
            dados.logradouro,
            dados.numero,
            dados.complemento,
            dados.bairro,
            dados.cidade,
            dados.uf,
            dados.idCliente, 
            id); 
    }
}