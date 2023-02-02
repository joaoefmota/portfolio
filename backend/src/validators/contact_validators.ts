import { RequestHandler } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(255)
    .pattern(/^[a-z0-9._]+@[a-z0-9-]+.[a-z]{2,3}$/)
    .trim()
    .required()
    .error(new Error("⚠ A valid email is required here, person.")),
  first_name: Joi.string()
    .max(255)
    .required()
    .error(new Error("⚠ Please provide the name your mama gave you.")),
  last_name: Joi.string()
    .max(255)
    .required()
    .error(
      new Error(
        "⚠ And a last name is also necessary so I can address you properly later :) "
      )
    ),
});

export const validateSubmit: RequestHandler<{
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}> = (req, res, next) => {
  const { first_name, last_name, email } = req.body;
  const { errors } = userSchema.validate(
    { first_name, last_name, email },
    { abortEarly: false }
  );
  if (errors) {
    res.status(422).json({ validationErrors: errors.details });
  } else {
    next();
  }
};
