import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

// connect to db
const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "event-db",
    });

    return Promise.resolve("Database connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;
