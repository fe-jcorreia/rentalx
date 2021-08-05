import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 desc",
      daily_rate: 140,
      license_plate: "CAR1-1080",
      fine_amount: 100,
      brand: "Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 desc",
      daily_rate: 140,
      license_plate: "CAR2-1080",
      fine_amount: 100,
      brand: "Brand2",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({ brand: "Brand2" });

    expect(cars).toEqual([car]);
  });
});
