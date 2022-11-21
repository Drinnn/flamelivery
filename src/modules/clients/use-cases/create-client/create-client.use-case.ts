import { hash } from 'bcrypt';
import prisma from '../../../../database/prismaClient';

export interface CreateClientUseCaseInputDto {
  username: string;
  password: string;
}

export interface CreateClientUseCaseOutputDto {
  id: string;
  username: string;
}

export class CreateClientUseCase {
  async execute({
    username,
    password,
  }: CreateClientUseCaseInputDto): Promise<CreateClientUseCaseOutputDto> {
    const existingClient = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (existingClient) {
      throw new Error('Client already exists.');
    }

    const hashedPassword = await hash(password, 10);

    const client = await prisma.client.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return {
      id: client.id,
      username: client.username,
    };
  }
}

export default CreateClientUseCase;
