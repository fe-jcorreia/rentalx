import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    let carsAvailable = this.cars.filter(car => car.available === true);

    if (brand) {
      carsAvailable = carsAvailable.filter(car => car.brand === brand);
    }

    if (category_id) {
      carsAvailable = carsAvailable.filter(
        car => car.category_id === category_id,
      );
    }

    if (name) {
      carsAvailable = carsAvailable.filter(car => car.name === name);
    }

    return carsAvailable;
  }
}

export { CarsRepositoryInMemory };
