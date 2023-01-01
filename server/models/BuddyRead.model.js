import mongoose from "mongoose";
import ReaderSchema from "./Reader.model.js";

const BuddyReadSchema = new mongoose.Schema(
  {
    bookid: {
      type: String,
      required: [true, "Book id is required"],
    },
    readers: {
      type: [ReaderSchema],
    },
  },
  { timestamps: true }
);

const BuddyRead = mongoose.model("BuddyRead", BuddyReadSchema);

export default BuddyRead;
