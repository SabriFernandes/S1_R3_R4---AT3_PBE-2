import express from "express";
import pedidoRoutes from "./routes/pedidoRoutes.js";
const app = express();
app.use(express.json());
app.use(pedidoRoutes);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});