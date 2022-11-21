import { hash } from 'bcrypt';
import prisma from '../../../../database/prismaClient';

export interface CreateDeliverymanUseCaseInputDto {
  username: string;
  password: string;
}

export interface CreateDeliverymanUseCaseOutputDto {
  id: string;
  username: string;
}

export class CreateDeliverymanUseCase {
  async execute({
    username,
    password,
  }: CreateDeliverymanUseCaseInputDto): Promise<CreateDeliverymanUseCaseOutputDto> {
    const existingDeliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (existingDeliveryman) {
      throw new Error('Deliveryman already exists.');
    }

    const hashedPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return {
      id: deliveryman.id,
      username: deliveryman.username,
    };
  }
}

export default CreateDeliverymanUseCase;
