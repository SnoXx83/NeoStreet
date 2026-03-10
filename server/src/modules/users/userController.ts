import argon2 from "argon2";
import type { RequestHandler, Response } from "express";
import type { AuthRequest } from "../../middleware/verifyToken";
import userRepository, { type IUser } from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();
    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req: AuthRequest, res: Response, next) => {
  try {
    // Fetch a specific user based on the provided ID
    res.status(200).json(req.user);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    // if (user == null) {
    //   res.sendStatus(404);
    // } else {
    //   res.json(user);
    // }
  } catch (err) {
    // next(err);
    res.status(500).send(`error:${err}`);
  }
};

// const getOneUser: RequestHandler = (req: AuthRequest, res: Response) => {
//   try {
//     res.status(200).json(req.user)
//   } catch (error) {
//     // console.log(error);
//     res.status(500).send(`error:${error}`)
//   }
// }

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, logo_url } = req.body;
    const hashedPassword = await argon2.hash(password);

    const newuser = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      logo_url: "qsdqs",
    };

    // Create the user
    const insertId = await userRepository.create(newuser);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
