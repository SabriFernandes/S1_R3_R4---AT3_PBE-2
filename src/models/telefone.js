export class Telefone {
    #id;
    #telefone;
    #idCliente;

    constructor(pTelefone, pIdCliente, pId){
        this.telefone = pTelefone;
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

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){
        this.#validarTelefone(value);
        this.#telefone = value;
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

    #validarTelefone(value){
        if (!value || value.trim().length < 8 || value.trim().length > 15) {
            throw new Error('Telefone deve ter entre 8 e 15 caracteres');
        }
    }

    #validarIdCliente(value){
        if (value && value <= 0) {
            throw new Error('ID do cliente inválido');
        }
    }

    // FACTORY METHOD
    static criar(dados){
        return new Telefone(dados.telefones,null, null); 
    }

    static alterar(dados, id){
        console.log(dados);
        
        return new Telefone(dados.telefone, dados.idCliente, id); 
    }
}