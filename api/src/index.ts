import express from "express";
import routes from './routes';
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express(); 

app.use(express.json());

app.listen(PORT, () => {
console.log(`Rodando na porta ${PORT}`);
});

app.use(routes);