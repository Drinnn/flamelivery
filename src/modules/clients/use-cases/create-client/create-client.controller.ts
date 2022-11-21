import { Request, Response } from 'express';
import CreateClientUseCase from './create-client.use-case';

export class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createClientUseCase = new CreateClientUseCase();
    const client = await createClientUseCase.execute({ username, password });

    return res.status(201).json(client);
  }
}

export default CreateClientController;
