export class Categoria {//O que tenho no banco
    #id; 
    #nome; 
    #descricao; 

    constructor(pNome, pDescricao, pId){
        this.nome = pNome //Método acessor 
        this.descricao = pDescricao 
        this.id = pId
    }

    //Métodos acessores - GET e SET 
    get id(){
        return this.#id; 
    }
    set id(value){
        this.#validarId(value);
        this.#id = value
    }
    get nome(){
        return this.#nome
    }
    set nome(value){
        this.#validarNome(value); 
        this.#nome=value;
    }
    get descricao(){
        return this.#descricao
    }

    set descricao(value){
        this.#validarDescricao(value); 
        this.#descricao=value; 
    }

    //Métodos auxiliares
    #validarId(value){
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado')
        }
    }
    #validarNome(value){
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatorio e deve ter entre 3 a 45 caracteres')
        }
    }
    #validarDescricao(value){
        if (value && (value.trim().length < 10 || value.trim().length > 100)) {
            throw new Error('Descrição deve ter entre 10 e 100 caracteres')
        }
    }

    //Criação de objetos ultilizando o Desing Pattern Factory Method
    static criar(dados){
        return new Categoria(dados.nome, dados.descricao, null); 
    }
    static alterar(dados, id){
        return new Categoria(dados.nome, dados.descricao, id); 
    }
}