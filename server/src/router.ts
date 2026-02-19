import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import productController from "./modules/products/productController";
// Define item-related routes
import tagController from "./modules/tags/tagController";
import userController from "./modules/users/userController";

router.get("/api/tags", tagController.browse);
router.get("/api/tags/:id", tagController.read);
router.post("/api/tags", tagController.add);

router.get("/api/products", productController.browse);
router.get("/api/products/:id", productController.read);
router.post("/api/products", productController.add);

router.get("/api/users", userController.browse);
router.get("/api/users/:id", userController.read);
router.post("/api/users", userController.add);

router.post("/api/login", userController.login);

/* ************************************************************************* */

export default router;
