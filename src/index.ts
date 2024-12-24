import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";

async function init() {
  try {
    // connect to db
    const result = await db();
    console.log("Database status: ", result);

    const PORT = 3000;
    const HOST = "localhost";

    const app = express();
    app.use(bodyParser.json()); // receive a json req

    // middleware
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
