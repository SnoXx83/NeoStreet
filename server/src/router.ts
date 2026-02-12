import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import tagController from "./modules/tags/tagController";

router.get("/api/tags", tagController.browse);
router.get("/api/tags/:id", tagController.read);
router.post("/api/tags", tagController.add);

/* ************************************************************************* */

export default router;
