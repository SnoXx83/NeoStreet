import express from "express";
import authController from "./auth/controller/authController";
import { verifyToken } from "./middleware/verifyToken";
import productController from "./modules/products/productController";
import tagController from "./modules/tags/tagController";
import userController from "./modules/users/userController";

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
export const route = express.Router();

route.get("/tags", tagController.browse);
route.get("/tags/:id", tagController.read);
route.post("/tags", tagController.add);

route.get("/products", productController.browse);
route.get("/products/:id", productController.read);
route.post("/products", productController.add);

route.get("/users", userController.browse);
// route.get("/users/:id", userController.read);
route.post("/users", userController.add);

route.post("/login", authController.login);

route.get("/me", verifyToken, userController.read);

/* ************************************************************************* */
