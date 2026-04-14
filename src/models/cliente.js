export class Cliente { // O que tenho no banco
    #id; 
    #nome; 
    #cpf; 

    constructor(pNome, pCpf, pId){
        this.nome = pNome; // Método acessor 
        this.cpf = pCpf;
        this.id = pId;
    }

    // Métodos acessores - GET e SET 
    get id(){
        return this.#id; 
    }

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value); 
        this.#nome = value;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(value){
        this.#validarCpf(value); 
        this.#cpf = value; 
    }

    // Métodos auxiliares
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarNome(value){
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 a 45 caracteres');
        }
        //trim => limpa espaços desnecessários no começo e no fim
    }

    #validarCpf(value){
    if (!value || value.trim().length !== 11) {
        throw new Error('O campo CPF é obrigatório e deve ter 11 caracteres');
    }
}

    // Factory Method
    static criar(dados){
        return new Cliente(dados.nome, dados.cpf, null); 
    }

    static alterar(dados, id){
        return new Cliente(dados.nome, dados.cpf, id); 
    }
}