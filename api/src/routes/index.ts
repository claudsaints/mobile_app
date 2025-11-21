import { Router, Request, Response } from "express";
import professor from "./professores";
import disciplina from "./disciplinas";
import professor_has_disciplina from "./professor_has_disciplinas";
import aluno from "./aluno";
import matricula from "./matricula";
import auth from "./auth";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.use("/auth", auth);
routes.use("/professor", authMiddleware, professor);
routes.use("/disciplina", authMiddleware, disciplina);
routes.use("/professor_has_disciplina", authMiddleware, professor_has_disciplina);
routes.use("/aluno", authMiddleware, aluno);
routes.use("/matricula", authMiddleware, matricula);

//aceita qualquer método HTTP ou URL
routes.use((_: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default routes;
