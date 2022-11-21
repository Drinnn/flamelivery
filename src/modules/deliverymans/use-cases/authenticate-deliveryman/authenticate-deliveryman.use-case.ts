import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import prisma from '../../../../database/prismaClient';

export interface AuthenticateDeliverymanUseCaseInputDto {
  username: string;
  password: string;
}

export interface AuthenticateDeliverymanUseCaseOutputDto {
  token: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({
    username,
    password,
  }: AuthenticateDeliverymanUseCaseInputDto): Promise<AuthenticateDeliverymanUseCaseOutputDto> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
    if (!deliveryman) {
      throw new Error('Invalid credentials.');
    }

    const passwordMatches = await compare(password, deliveryman.password);
    if (!passwordMatches) {
      throw new Error('Invalid credentials.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: deliveryman.id,
      expiresIn,
    });

    return { token };
  }
}

export default AuthenticateDeliverymanUseCase;
