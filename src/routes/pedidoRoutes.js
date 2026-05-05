import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const router = Router();

router.post("/pedidos", pedidoController.criar);
router.get("/pedidos",  pedidoController.listar);
router.patch("/pedidos/:pedidoId/status", pedidoController.alterarStatus);
router.post("/pedidos/:pedidoId/itens", pedidoController.adicionarItem);
router.put("/pedidos/:pedidoId/itens/:itemId", pedidoController.editarItem);
router.delete("/pedidos/:pedidoId/itens/:itemId",pedidoController.deletarItem);


export default router;