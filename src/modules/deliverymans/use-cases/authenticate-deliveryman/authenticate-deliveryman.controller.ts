import { Request, Response } from 'express';
import AuthenticateDeliverymanUseCase from './authenticate-deliveryman.use-case';

export class AuthenticateDeliverymanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return res.status(200).json(token);
  }
}

export default AuthenticateDeliverymanController;
