import express from "express";
import routes from "./routes/routes.js";
import 'dotenv/config';

const app = express();
app.use(express.json());//Tem que fazer
app.use('/', routes);//Vai para a rota

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});