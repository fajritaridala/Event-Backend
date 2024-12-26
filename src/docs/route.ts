import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import fs from "fs";
import path from "path";

// This function will be called in the main file
export default function docs(app: Express) {
  const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../node_modules/swagger-ui-dist/swagger-ui.css"
    ),
    "utf-8"
  );

  // Serve the swagger documentation
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: css,
    })
  );
}
