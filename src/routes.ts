import { Router } from 'express';
import AuthenticateClientController from './modules/clients/use-cases/authenticate-client/authenticate-client.controller';
import CreateClientController from './modules/clients/use-cases/create-client/create-client.controller';
import AuthenticateDeliverymanController from './modules/deliverymans/use-cases/authenticate-deliveryman/authenticate-deliveryman.controller';
import CreateDeliverymanController from './modules/deliverymans/use-cases/create-deliveryman/create-deliveryman.controller';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

routes.post('/clients', createClientController.handle);
routes.post('/clients/authenticate', authenticateClientController.handle);

routes.post('/deliverymans', createDeliverymanController.handle);
routes.post(
  '/deliverymans/authenticate',
  authenticateDeliverymanController.handle
);

export default routes;
