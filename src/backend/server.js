import express from "express";
import cors from "cors";
import public_routes from "./routes/public_routes.js";

const app = express();
app.use(express.json());

app.use(cors());


app.use("/", public_routes);


const conexaoServer = process.env.CONEXAO_SERVER || 3000;

app.listen(conexaoServer, () => {
  console.log(`Servidor rodando na porta: ${conexaoServer}`);
});