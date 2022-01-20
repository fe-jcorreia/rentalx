import { inject, injectable } from "tsyringe";

import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: CarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImageUseCase };
