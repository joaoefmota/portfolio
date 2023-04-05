import { RequestHandler } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string()
    .max(255)
    .required()
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      "string.pattern.base": "⚠ Invalid first name.",
      "any.required": "⚠ First name is required.",
      "string.empty": "⚠ Please state your first name.",
    }),
  last_name: Joi.string()
    .max(255)
    .required()
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      "string.pattern.base": "⚠ Invalid last name.",
      "any.required": "⚠ Last name is required.",
      "string.empty": "⚠ Please state your last name.",
    }),
  email: Joi.string()
    .email()
    .max(255)
    .pattern(/^[a-z0-9._]+@[a-z0-9-]+.[a-z]{2,3}$/)
    .trim()
    .required()
    .messages({
      "string.email": "⚠ Invalid email address.",
      "string.pattern.base": "⚠ Invalid email address.",
      "string.empty": "⚠ Please write your email.",
      "any.required": "⚠ Email is required.",
    }),
  message: Joi.string().max(1500).required().messages({
    "string.max": "⚠ Your message is too long.",
    "any.required": "⚠ A nice message is required.",
    "string.empty": "⚠ Please write a nice message.",
  }),
});

export const validateSubmit: RequestHandler<{
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}> = (req, res, next) => {
  const { first_name, last_name, email, message } = req.body;
  const { error } = userSchema.validate(
    { first_name, last_name, email, message },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error });
    console.log("error details", error.details);
  } else {
    next();
  }
};
