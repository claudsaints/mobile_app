import { Router } from "express";
import controller from "../controllers/AuthController";

const routes = Router();

routes.post('/', controller.createUser);
routes.get('/', controller.readUser);
routes.put('/', controller.updatePassword);

export default routes;