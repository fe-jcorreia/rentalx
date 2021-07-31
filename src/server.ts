import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { errorTreatment } from "./middlewares/errorTreatment";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "@shared/container";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(errorTreatment);

app.listen(3333, () => console.log("Server is Running!"));
