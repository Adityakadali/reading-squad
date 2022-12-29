import mongoose from "mongoose";
import Reader from "./Reader.model.js";

const BuddyReadSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: [true, "Book id is required"],
    },
    readers: {
      type: [Reader],
    },
  },
  { timestamps: true }
);
