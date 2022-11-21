import { Router } from 'express';
import CreateClientController from './modules/clients/use-cases/create-client/create-client.controller';

const routes = Router();

const createClientController = new CreateClientController();

routes.post('/clients', createClientController.handle);

export default routes;
