import express from "express";
import { User } from "../model/user.js";

const router = express.Router();

//register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    const userFound = User.findOne({ uid });
    if (userFound) {
      return res.status(422).json({ message: "User already exists!" });
    } else {
      const newUser = new User({
        name,
        email,
        uid,
      });
      const registerUser = await newUser.save();

      res.status(201).send({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ error: err.message });
  }
});
