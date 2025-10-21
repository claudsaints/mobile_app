import { Router } from "express";
import controller from "../controllers/ProfessorController";
const routes = Router();
routes.post('/', controller.create);
routes.delete('/', controller.delete);
routes.put('/', controller.update);
export default routes;