import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "swagger.json";

import { errorTreatment } from "@shared/infra/http/middlewares/errorTreatment";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import "@shared/container";

createConnection();
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(errorTreatment);

app.listen(3333, () => console.log("Server is Running!"));
