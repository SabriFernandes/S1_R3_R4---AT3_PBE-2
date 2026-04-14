import { Cliente } from "../models/cliente.js";
import { Endereco } from "../models/endereco.js";
import { Telefone } from "../models/telefone.js";
import clienteRepository from "../repositories/clienteRepository.js";
import { limparNumero } from "../utils/limparNumero.js";
import axios from "axios";

const clienteController = {

    criar: async (req, res) => {//Criar o cliente, telefone e local; 
        try {
            let { nome, numero, telefones, complemento, cpf, cep } = req.body;

            const cepRegex = /^[0-9]{8}$/;//Conta para validar CPF
            telefones = limparNumero(telefones);//limparNumero esta sendo chamado da pasta utils;
            cep = limparNumero(cep);
            cpf = limparNumero(cpf);

            // Valida se o CEP informado está no formato correto;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({//Erro 400 se não estiver válido;
                    message: 'verifique o cep informado'
                });
            }
            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);//API que esta sendo chamada para o cep ser valido

            if (respApi.data.erro) {// Verifica se a API retornou erro (CEP não encontrado)
                throw new Error('erro ao consultar o cep na API');
            }
            // Pega os dados do endereço retornados pela API do ViaCEP
            const logradouro = respApi.data.logradouro;
            const bairro = respApi.data.bairro;
            const cidade = respApi.data.localidade;
            const uf = respApi.data.uf;

            //Cria 
            const cliente = Cliente.criar({ nome, cpf });
            const endereco = Endereco.criar({ logradouro, numero, complemento, bairro, cidade, uf, cep });
            const telefone = Telefone.criar({ telefones });
            const result = await clienteRepository.criar(cliente, endereco, telefone);

            return res.status(201).json({
                message: 'cliente criado com sucesso',
                cliente: result
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;

            const {nome, cpf, cep, numero, complemento, telefone} = req.body;

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);//Chama a api

            if (respApi.data.erro) {
                throw new Error('erro ao consultar o cep na API');
            }
            const logradouro = respApi.data.logradouro;
            const bairro = respApi.data.bairro;
            const cidade = respApi.data.localidade;
            const uf = respApi.data.uf;

            //Editar o cliente 
            const cliente = Cliente.alterar({ nome, cpf }, id);

            //Editar o Endereço
            const endereco = Endereco.alterar({cep, logradouro, numero, complemento, bairro, cidade, uf, idCliente: id}, id);

            //Editar o telefone
           const tel = Telefone.alterar({ telefone, idCliente: id }, id)

            await clienteRepository.editar(cliente, tel, endereco);

            res.status(200).json({ message: 'Dados atualizados com sucesso' });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um error no servidor',
                errorMessage: error.message
            });
        }
    },

     deletar: async (req, res) => {
        try {
            const id = req.params.id
            const result = await clienteRepository.deletar(id);//Chama no repository para deletar
            res.json(result)

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    selecionar: async (req, res) => {
        try {const result = await clienteRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um error no servidor',errorMessage: error.message});
        }
    }
}

// Função que consulta um CEP na API do ViaCEP
 async function consultaCep(cep){
            try {
                   // Faz uma requisição para a API passando o CEP
                const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); 
                if(resApi.data.erro){ // Verifica se o CEP não foi encontrado
                    throw new Error('CEP não encontrado')
                }
                return resApi.data;
            } catch (error) {
                console.error(error)
                throw new Error("Erro ao buscar CEP", error.message);
            }
        }

export default clienteController;