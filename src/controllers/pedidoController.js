import { statusPedido } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {

    // POST 
    criar: async (req, res) => {
        try {
            const { clienteId, itens } = req.body;
            const itensPedido = itens.map(item =>
                ItensPedido.criar({produtoId: item.produtoId, quantidade: item.quantidade, valorItem: item.valorItem })
            );

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);
            const pedido = Pedido.criar({ clienteId, subTotal, status: statusPedido.ABERTO });
            const result = await pedidoRepository.criar(pedido, itensPedido);
            return res.status(201).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // GET 
    listar: async (req, res) => {
        try {
            const result = await pedidoRepository.listar();
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // PATCH 
    alterarStatus: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);//Tem que ser um número
            const { status } = req.body;

            const statusValidos = Object.values(statusPedido);//Verificar se é valido 
            if (!statusValidos.includes(status)) {
                return res.status(400).json({ message: "Status inválido" });
            }

            const result = await pedidoRepository.alterarStatus(pedidoId, status);

            if (result.affectedRows === 0) {//Linhas que foram alterados pelo banco
                return res.status(404).json({ message: "Pedido não encontrado" });
            }
            return res.status(200).json({
                message: "Status do pedido atualizado com sucesso",novoStatus: status});

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // POST
    adicionarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const { produtoId, quantidade, valorItem } = req.body;

            const item = ItensPedido.criarComPedido(
                { produtoId, quantidade, valorItem, pedidoId }, null
            );

            const result = await pedidoRepository.adicionarItem({
                pedidoId,
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                valorItem: item.valorItem
            });

            return res.status(201).json({
                message: "Item adicionado ao pedido com sucesso",
                subTotalAtualizado: result.subTotalAtualizado,
                result: result.rowsItem
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // PUT 
    editarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const itemId = Number(req.params.itemId);
            const { quantidade } = req.body;

            if (!quantidade || quantidade <= 0) {
                return res.status(400).json({ message: "Informe uma quantidade válida" });
            }
            const result = await pedidoRepository.editarItem(itemId, pedidoId, quantidade);
            return res.status(200).json({
                message: "Item atualizado com sucesso",
                novoSubTotal: result.novoSubTotal
            });

        } catch (error) {
            console.log(error);

            const statusCode = error.message.includes("não encontrado") ? 404 : 500;
            return res.status(statusCode).json({ message: error.message });
        }
    },

    // DELETE
    deletarItem: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            const itemId = Number(req.params.itemId);
            const result = await pedidoRepository.deletarItem(itemId, pedidoId);
            return res.status(200).json({
                message: "Item excluído com sucesso",
                subTotalAtualizado: result.subTotalAtualizado
            });

        } catch (error) {
            console.log(error);
            const statusCode = error.message.includes("não encontrado") ? 404 : 500;//Verifica a mnsagem do erro, se não der o erro 404 pode dar 500
            return res.status(statusCode).json({ message: error.message });
        }
    }
};

export default pedidoController;