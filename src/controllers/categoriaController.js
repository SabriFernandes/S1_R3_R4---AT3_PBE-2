import { Categoria } from "../models/categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";

const categoriaController = {
    criar: async(req, res) => {
        try {
            const {nome, descricao} = req.body; 
            const categoria = Categoria.criar({nome, descricao})
            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({result})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um error no servidor', errorMessage: error.message})
        }
    },
    editar: async(req, res) => {
        try {
            const id = req.params.id; 
            const {nome, descricao} = req.body; 
            const categoria = Categoria.alterar({nome, descricao}, id)
            const result = await categoriaRepository.editar(categoria);
            res.status(200).json({result})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um error no servidor', errorMessage: error.message})
        }
    },
    deletar: async(req, res) => {
        try {
            const id = req.params.id; 
            const result = await categoriaRepository.delete(id);
            res.status(200).json({result})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um error no servidor', errorMessage: error.message})
        }
    },
    selecionar: async(req, res) => {
        try {
            const result = await categoriaRepository.selecionar();
            res.status(200).json({result})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um error no servidor', errorMessage: error.message})
        }
    }
}

export default categoriaController