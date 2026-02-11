import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import productController from "./modules/products/productController";

router.get("/api/items", productController.browse);
router.get("/api/items/:id", productController.read);
router.post("/api/items", productController.add);

/* ************************************************************************* */

export default router;
