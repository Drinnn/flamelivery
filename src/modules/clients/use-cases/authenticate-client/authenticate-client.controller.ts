import { Request, Response } from 'express';
import AuthenticateClientUseCase from './authenticate-client.use-case';

export class AuthenticateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateClientUseCase = new AuthenticateClientUseCase();

    const token = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return res.status(200).json(token);
  }
}

export default AuthenticateClientController;
