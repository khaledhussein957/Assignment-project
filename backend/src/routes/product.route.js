import express from "express";

import {
  validateProduct,
  validateUpdateProduct,
  validateProductId,
} from "../middlewares/productValidate.middleware.js";
import uploadImages from "../middlewares/upluad.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", validateProductId, getProductById);
router.post(
  "/",
  validateProduct,
  uploadImages.array("images", 3),
  createProduct
);
router.put(
  "/:id",
  validateUpdateProduct,
  uploadImages.array("images", 3),
  updateProduct
);
router.delete("/:id", validateProductId, deleteProduct);

export default router;
