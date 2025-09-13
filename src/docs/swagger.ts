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
      RegisterRequest: {
        fullName: "Muh. Fadjri Taridala",
        username: "fadjritaridala",
        email: "c206b4ky2610@bangkit.academy",
        password: "fadjri1234",
        confirmPassword: "fadjri1234",
      },
      ActivationRequest: {
        code: "abc",
      },
      CreateCategoryRequest: {
        name: "",
        description: "",
        icon: "",
      },
      CreateEventRequest: {
        name: "",
        banner: "fileUrl",
        category: "category ObjectId",
        description: "",
        startDate: "yyyy-mm-dd hh:mm:ss",
        endDate: "yyyy-mm-dd hh:mm:ss",
        location: {
          region: "region id",
          coordinate: [0, 0],
        },
        isOnline: false,
        isFeatured: true,
      },
      RemoveMediaRequest: {
        fileUrl: "",
      },
    },
  },
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFiles, doc);
