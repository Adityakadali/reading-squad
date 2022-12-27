import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./config/db.js";

connectDB();

app.listen(config.PORT, () => {
  console.log(`Listening on PORT: ${config.PORT}`);
});
