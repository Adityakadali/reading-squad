import express from "express";
import BuddyRead from "../models/BuddyRead.model.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

export const buddyread = express.Router();

buddyread.post("/", isAuthenticated, async (req, res) => {
  const { id } = req.body;
  const user = req.user;
  try {
    let data = await BuddyRead.findOne({ bookid: id });
    if (data) {
      data.readers.forEach((reader) => {
        if (reader.userid == user.discordId) {
          console.log("here");
          return res
            .status(201)
            .json({ message: "Book is already in your list" });
        }
      });
      data.readers.push({
        userid: user.discordId,
        userName: user.name,
      });
      await data.save();
      return res.status(200).json(data);
    }
    data = BuddyRead.create({
      bookid: id,
      readers: [
        {
          userid: user.discordId,
          userName: user.name,
        },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {}
});
