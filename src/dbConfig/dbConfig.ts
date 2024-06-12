import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error, please make sure db is up and running: " +
          err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
