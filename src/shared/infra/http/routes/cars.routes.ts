import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarController = container.resolve(CreateCarController);
const listAvailableCarsController = container.resolve(
  ListAvailableCarsController,
);
const createCarSpecificationController = container.resolve(
  CreateCarSpecificationController,
);
const uploadCarImageController = container.resolve(UploadCarImageController);

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  "/images/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImageController.handle,
);

export { carsRoutes };
