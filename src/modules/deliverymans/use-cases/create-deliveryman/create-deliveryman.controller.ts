import { Request, Response } from 'express';
import CreateDeliverymanUseCase from './create-deliveryman.use-case';

export class CreateDeliverymanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();

    const deliveryman = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return res.status(201).json(deliveryman);
  }
}

export default CreateDeliverymanController;
