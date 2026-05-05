export class ItensPedido {

    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    constructor(pProdutoId, pQuantidade, pValorItem, pId, pPedidoId) {
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;
    }

    //CONSTRUCTOR
    
    //getters
    get id() {
        return this.#id;
    }
    get pedidoId() {
        return this.#pedidoId
    }
    get produtoId() {
        return this.#produtoId
    }
    get quantidade() {
        return this.#quantidade
    }
    get valorItem() {
        return this.#valorItem
    }

    //setters

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set pedidoId(value) {
        this.#validarPedidoId(value);
        this.#pedidoId = value;
    }
    set produtoId(value) {
        this.#validarProdutoId(value);
        this.#produtoId = value;
    }
    set quantidade(value) {
        this.#validarQuantidade(value);
        this.#quantidade = value;
    }
    set valorItem(value) {
        this.#validarValorItem(value);
        this.#valorItem = value;
    }

    //metodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID Informado");
        }
    }
    #validarPedidoId(value) {
        if (!value && value <= 0) {
            throw new Error("Verifique o ID do pedido Informado");
        }
    }
    #validarProdutoId(value) {
        if (!value && value <= 0) {
            throw new Error("Verifique o ID do produto Informado");
        }
    }
    #validarQuantidade(value) {
        if (!value && value <= 0) {
            throw new Error("Não foi possível obter a quantidade");
        }
    }
    #validarValorItem(value) {
        if (!value && value <= 0) {
            throw new Error("Informe um valor para o Item");
        }
    }

    static calcularSubTotalItens(itens){
        return (itens.reduce(
            (total,item)=> total+(item.valorItem* item.quantidade), 0
        ));//só o total sera retornado
    }

    //design pattern

    static criar(dados) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, null, null);
    }
    static criar(dados, id) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, id, dados.pedidoId);
    }



}





