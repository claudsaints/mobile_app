import { Router, Request, Response } from "express";
import professor from "./professores";
import disciplina from "./disciplinas";
import professor_has_disciplina from "./professor_has_disciplinas";
import aluno from "./aluno";
import auth from "./auth";

const routes = Router();

routes.use("/auth", auth);
routes.use("/professor", professor);
routes.use("/disciplina", disciplina);
routes.use("/professor_has_disciplina", professor_has_disciplina);
routes.use("/aluno", aluno);

//aceita qualquer método HTTP ou URL
routes.use((_: any, res: any) =>
  res.json({ error: "Requisição desconhecida" })
);
export default routes;
