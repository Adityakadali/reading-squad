import mongoose from "mongoose";
import authRoles from "../utils/authRoles.js";

const userSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: [true, "ID is a required feild"],
    },
    name: {
      type: String,
      required: [true, "Name is a required feild"],
      maxLength: [50, "Name should be less than 50 charecters"],
    },
    discriminator: {
      type: String,
      required: [true, "Discriminator is required"],
    },
    email: {
      type: String,
      required: [true, "Email is a required feild"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(authRoles),
      default: authRoles.USER,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
