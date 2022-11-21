import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import prisma from '../../../../database/prismaClient';

export interface AuthenticateClientUseCaseInputDto {
  username: string;
  password: string;
}

export interface AuthenticateClientUseCaseOutputDto {
  token: string;
}

export class AuthenticateClientUseCase {
  async execute({
    username,
    password,
  }: AuthenticateClientUseCaseInputDto): Promise<AuthenticateClientUseCaseOutputDto> {
    const client = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
    if (!client) {
      throw new Error('Invalid credentials.');
    }

    const passwordMatches = await compare(password, client.password);
    if (!passwordMatches) {
      throw new Error('Invalid credentials.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return { token };
  }
}

export default AuthenticateClientUseCase;
