import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (cliente, endereco, telefone) => {

        console.log(telefone.numero);

        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction()
            // Insert Cliente
            const sqlCliente = 'INSERT INTO clientes(Nome, CPF) VALUES (?, ?)';
            const valueCliente = [cliente.nome, cliente.cpf];
            const [rowsCliente] = await conn.execute(sqlCliente, valueCliente);

            // Insert Telefone
            const sqlTelefone = 'INSERT INTO telefones(idCLiente, telefone) VALUES (?, ?)';
            const valuesTelefone = [rowsCliente.insertId, telefone.telefone];
            await conn.execute(sqlTelefone, valuesTelefone);

            // Insert Endereco
            const sqlEndereco = `
                INSERT INTO enderecos 
                ( CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF,idCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const valuesEndereco = [
                endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, rowsCliente.insertId];
            await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit();
        } catch (error) {
            conn.rollback();
            console.error("Erro ao criar cliente:", error);
            throw error;

        }
        finally {
            conn.release();
        }
    },

    editar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection()
        try {
            await conn.beginTransaction();
            
            const sqlCliente = `UPDATE clientes SET nome = ?, cpf = ? WHERE id = ?`
            const valuesCliente = [cliente.nome, cliente.cpf, cliente.id];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente)

            const sqlTelefone = `UPDATE telefones SET telefone = ? WHERE idCliente = ?`
            const valuesTelefone = [telefone.telefone, cliente.id];
            const [rowsTelefone] = await conn.execute(sqlTelefone, valuesTelefone)

            const sqlEndereco = `UPDATE enderecos SET Cep = ?, Numero = ?, Complemento = ?, Logradouro = ?, Bairro = ?, Cidade = ?, uf = ? WHERE IdCliente = ?`
            const valuesEndereco = [endereco.cep, endereco.numero, endereco.complemento, endereco.logradouro, endereco.bairro, endereco.cidade, endereco.uf, cliente.id];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco)

            conn.commit()
            return { rowsCliente, rowsTelefone, rowsEndereco };
        } catch (error) {
            conn.rollback();
            throw error;
        }
        finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection(); //conecta ao banco
        try {
            await conn.beginTransaction();//inicia a transação
         
            //Deleta por partes
            await conn.execute("DELETE FROM telefones WHERE idCliente=?", [id]);
            await conn.execute("DELETE FROM enderecos WHERE idCliente=?", [id]);
            await conn.execute("DELETE FROM clientes WHERE id=?", [id]);
            
            await conn.commit();
            return {message: "cliente deletado com sucesso"};

        } catch (error) {
            await conn.rollback();
            throw error; 
        }finally{
            conn.release
        }
    },

    selecionar: async () => {//Seleciona
        const sql = 'SELECT * FROM clientes';
        const [rows] = await connection.execute(sql);
        return rows;
    }

}
export default clienteRepository;