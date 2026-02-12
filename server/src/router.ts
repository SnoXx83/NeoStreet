import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import productController from "./modules/products/productController";

router.get("/api/products", productController.browse);
router.get("/api/products/:id", productController.read);
router.post("/api/products", productController.add);

// router.get("/api/users", userController.browse);
// router.get("/api/users/:id", userController.read);
// router.post("/api/users", userController.add);


/* ************************************************************************* */

export default router;
