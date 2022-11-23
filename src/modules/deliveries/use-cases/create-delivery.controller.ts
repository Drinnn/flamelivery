import { Request, Response } from 'express';
import CreateDeliveryUseCase from './create-delivery.use-case';

export class CreateDeliveryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { clientId, itemName } = req.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeliveryUseCase.execute({
      clientId,
      itemName,
    });

    return res.status(201).json(delivery);
  }
}

export default CreateDeliveryController;
