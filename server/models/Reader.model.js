import mongoose from "mongoose";

// TODO: Add checks

const ReaderSchema = new mongoose.Schema({
  userid: String,
  userName: String,
});

export default ReaderSchema;
