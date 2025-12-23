import Joi from "joi";

// Joi validation schema
export const productSchema = Joi.object({
  name: Joi.string().min(3).required().label("Product Name"),
  price: Joi.number().min(0).required().label("Price"),
  quantity: Joi.number().min(0).required().label("Stock"),
  description: Joi.string().min(10).required().label("Description"),
  images: Joi.array().max(3).required().label("Product Images"),
});
