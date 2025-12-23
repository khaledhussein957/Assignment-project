import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validate.js";

export const validateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateProductId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  next();
};
