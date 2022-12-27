import mongoose from "mongoose";
import config from "./index.js";

mongoose.set("strictQuery", false); // To remove the warning about strict query
const connectDB = () => {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to the MongoDB cloud"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default connectDB;
