import { connection } from "../configs/Database.js";

const pedidoRepository = {

    // PEDIDOS

    criar: async (pedido, itens) => {//Cria os pedidos
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction(); //inicia a transação do banco de dados;

            const sqlPedido = 'INSERT INTO pedidos (ClienteId, SubTotal, Status) VALUES (?, ?, ?);';
            const valuesPedido = [pedido.clienteId, pedido.subTotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            for (const item of itens) {
                const sqlItens = 'INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?);';
                const valuesItens = [rowsPedido.insertId, item.produtoId, item.quantidade, item.valorItem];
                await conn.execute(sqlItens, valuesItens);
            }
             await conn.commit();
            return { rowsPedido };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    alterarStatus: async (pedidoId, novoStatus) => { //Altera o status no momento que é atualizado
        const sql = 'UPDATE pedidos SET Status = ? WHERE Id = ?;';//SET para atualizar
        const [rows] = await connection.execute(sql, [novoStatus, pedidoId]);
        return rows;
    },

    listar: async () => { // Listar os pedidos
        const sql = `
            SELECT p.Id AS pedidoId,p.ClienteId, p.SubTotal,p.Status,ip.Id AS itemId, ip.ProdutoId, ip.Quantidade, ip.ValorItem
FROM pedidos p INNER JOIN itens_pedidos ip ON p.Id = ip.PedidoId ORDER BY p.Id;`; //Junta pedido com itens
        const [rows] = await connection.execute(sql);
        return rows;
    },

    // ITENS DO PEDIDO

    adicionarItem: async (item) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlInsert = `
                INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?);`;
            const [rowsItem] = await conn.execute(sqlInsert, [item.pedidoId, item.produtoId, item.quantidade, item.valorItem]);
//sqlInsert => adicionar novas linhas; 
            const [rowsSubTotal] = await conn.execute(
                'SELECT (Quantidade * ValorItem) AS total FROM itens_pedidos WHERE PedidoId = ?;',
                [item.pedidoId]
            );
            const subTotalAtualizado = rowsSubTotal[0].total || 0; //Resultado do SQL

            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [subTotalAtualizado, item.pedidoId]
            );

            await conn.commit();
            return { rowsItem, subTotalAtualizado };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editarItem: async (itemId, pedidoId, quantidade) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const [rowsUpdate] = await conn.execute(
                'UPDATE itens_pedidos SET Quantidade = ? WHERE Id = ? AND PedidoId = ?;',
                [quantidade, itemId, pedidoId]
            );

            if (rowsUpdate.affectedRows === 0) { //Verificar se o Update foi realizado
                throw new Error('Item não encontrado para este pedido');
            }

            const [rowsSubTotal] = await conn.execute(
                'SELECT (Quantidade * ValorItem) AS total FROM itens_pedidos WHERE PedidoId = ?;',
                [pedidoId]
            );
            const novoSubTotal = rowsSubTotal[0].total || 0;
            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [novoSubTotal, pedidoId]
            );

            await conn.commit();
            return { rowsUpdate, novoSubTotal };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletarItem: async (itemId, pedidoId) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const [rowsDelete] = await conn.execute(
                'DELETE FROM itens_pedidos WHERE Id = ? AND PedidoId = ?;',
                [itemId, pedidoId]
            );

            if (rowsDelete.affectedRows === 0) {
                throw new Error('Item não encontrado para este pedido');
            }

            const [rowsSubTotal] = await conn.execute('SELECT (Quantidade * ValorItem) AS total FROM itens_pedidos WHERE PedidoId = ?;',
                [pedidoId]
            );
            const subTotalAtualizado = rowsSubTotal[0].total || 0;

            await conn.execute(
                'UPDATE pedidos SET SubTotal = ? WHERE Id = ?;',
                [subTotalAtualizado, pedidoId]
            );

            await conn.commit();
            return { rowsDelete, subTotalAtualizado };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;