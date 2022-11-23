import prisma from '../../../database/prismaClient';

export interface CreateDeliveryUseCaseInputDto {
  clientId: string;
  itemName: string;
}

export interface CreateDeliveryUseCaseOutputDto {
  id: string;
  clientId: string;
  itemName: string;
  createdAt: Date;
}

export class CreateDeliveryUseCase {
  async execute(
    dto: CreateDeliveryUseCaseInputDto
  ): Promise<CreateDeliveryUseCaseOutputDto> {
    const { clientId, itemName } = dto;

    const delivery = await prisma.delivery.create({
      data: {
        client_id: clientId,
        item_name: itemName,
      },
    });

    return {
      id: delivery.id,
      clientId: delivery.client_id,
      itemName: delivery.item_name,
      createdAt: delivery.created_at,
    };
  }
}

export default CreateDeliveryUseCase;
