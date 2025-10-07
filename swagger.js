import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const apiUrl = process.env.API_URL || "http://localhost:8080";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Test CRUD API for users and books",
    },
    servers: [
      {
        url: apiUrl,
      },
    ],
  },
  apis: ["./docs/*.js"],
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
