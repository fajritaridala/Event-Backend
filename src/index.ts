import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/api";
import db from "./utils/database";
import docs from "./docs/route";

async function init() {
  try {
    // Connect to the database
    const result = await db();
    console.log("Database status: ", result);

    const PORT = 3001;
    const HOST = "localhost";

    // Create an express app
    const app = express();
    app.use(cors())
    app.use(bodyParser.json()); // receive a json req

    // Create a simple route
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    // Use the router
    app.use("/api", router);
    docs(app);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
