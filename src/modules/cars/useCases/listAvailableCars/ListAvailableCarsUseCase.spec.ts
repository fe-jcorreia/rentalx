import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand2" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 desc",
      daily_rate: 140,
      license_plate: "CAR3-1080",
      fine_amount: 100,
      brand: "Brand3",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car4 desc",
      daily_rate: 140,
      license_plate: "CAR4-1080",
      fine_amount: 100,
      brand: "Brand4",
      category_id: "category_id4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id4",
    });

    expect(cars).toEqual([car]);
  });
});
