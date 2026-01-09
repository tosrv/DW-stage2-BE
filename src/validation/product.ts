import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Product name minimum 3 characters",
    "any.required": "Product name is required",
  }),

  price: Joi.number().integer().positive().required().messages({
    "number.positive": "Product price must be greater than 0",
    "any.required": "Product price is required",
  }),
});
