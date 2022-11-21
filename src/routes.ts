import { Router } from 'express';
import AuthenticateClientController from './modules/clients/use-cases/authenticate-client/authenticate-client.controller';
import CreateClientController from './modules/clients/use-cases/create-client/create-client.controller';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post('/clients', createClientController.handle);
routes.post('/clients/authenticate', authenticateClientController.handle);

export default routes;
