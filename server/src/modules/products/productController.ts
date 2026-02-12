import type { RequestHandler } from "express";

// Import access to data
import productRepository from "./productRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all products
    const products = await productRepository.readAll();

    // Respond with the products in JSON format
    res.json(products);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific product based on the provided ID
    const productId = Number(req.params.id);
    const product = await productRepository.read(productId);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the product in JSON format
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the product data from the request body
    const newproduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url,
      stock: req.body.stock,
      tag_id: req.body.tag_id,
    };

    // Create the product
    const insertId = await productRepository.create(newproduct);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted product
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
