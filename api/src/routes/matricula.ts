import { Router } from "express";
import controller from "../controllers/MatriculaAlunoController";

const routes = Router();

routes.post('/', controller.create);
routes.get('/list', controller.list);
routes.get('/aluno/:alunoId', controller.getByAlunoId);
routes.get('/disciplina/:disciplineId', controller.getByDisciplinaId);
routes.delete('/', controller.delete);
routes.put('/', controller.update);

export default routes;