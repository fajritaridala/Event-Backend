import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointFiles = ["../routes/api.ts"];
const doc = {
  info: {
    version: "v0.0.1",
    title: "Event Backend Documentation",
    description: "Event Backend Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
    {
      url: "https://event-backend-sage.vercel.app/api",
      description: "Production Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "fadjritaridala@gmail.com",
        password: "fadjriajh19",
      },
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFiles, doc);
