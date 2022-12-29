import mongoose from "mongoose";

// TODO: Add checks

const ReaderSchema = new mongoose.Schema({
  userid: String,
  userName: String,
});

const Reader = mongoose.model(ReaderSchema);

export default Reader;
