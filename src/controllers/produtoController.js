import { Produto } from "../models/produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    criar: async (req, res) => {//Area de criar o produto
        try {
            const { idCategoria, nome, valor } = req.body;//Todos que temos no Banco de dados
            const caminhoImagem = req.file ? req.file.filename : null;//Passar a imagem
            const produto = new Produto(null, idCategoria, nome, valor, caminhoImagem);
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });

        } catch (error) {//Caso ocorra um erro no servidor
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {//Alterar todos que são propriedades
        try {
            const id = req.params.id;
            const { idCategoria, nome, valor } = req.body || {};
            const produto = new Produto(id, idCategoria, nome, valor, null);
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => { //Deletar o produto
        try {
            const id = req.params.id;
            const result = await produtoRepository.delete(id);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    selecionar: async (req, res) => {//Listar as propriedades
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default produtoController;