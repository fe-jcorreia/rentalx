import { Router } from "express";
import { container } from "tsyringe";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();
const createCarController = container.resolve(CreateCarController);

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
