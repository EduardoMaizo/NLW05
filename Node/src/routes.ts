import { Router } from "express";
import { SettingsController } from "./controllers/SettingsController";

const routes = Router();

/*
    Tipos de parametros:
        Route Params => Parametros de rotas
        Query Params => Filtros e buscas
        Body params => Passando parametros pelo body
*/

const settingsController = new SettingsController();

routes.post("/settings", settingsController.create)

export { routes }