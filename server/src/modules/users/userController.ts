import type { RequestHandler } from "express";

// Import access to data
import tagRepository from "../tags/tagRepository";
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tags
    const tags = await tagRepository.readAll();

    // Respond with the tags in JSON format
    res.json(tags);
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
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific tag based on the provided ID
    const tagId = Number(req.params.id);
    const tag = await tagRepository.read(tagId);

    // If the tag is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tag in JSON format
    if (tag == null) {
      res.sendStatus(404);
    } else {
      res.json(tag);
      // Fetch a specific user based on the provided ID
      const userId = Number(req.params.id);
      const user = await userRepository.read(userId);

      // If the user is not found, respond with HTTP 404 (Not Found)
      // Otherwise, respond with the user in JSON format
      if (user == null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the tag data from the request body
    // const { label, sdqsd,qsdqsdqs,qsdqsdqs } = req.body;
    // Create the tag
    // const insertId = await tagRepository.create({ label });
    // Respond with HTTP 201 (Created) and the ID of the newly inserted tag
    // Extract the user data from the request body
    const newuser = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      logo_url: req.body.logo_url,
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
