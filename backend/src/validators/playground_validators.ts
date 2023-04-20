import { RequestHandler } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "⚠ A name is required.",
    "string.empty": "⚠ Please state your the name.",
    "string.max": "⚠ This name is too long.",
  }),
  content: Joi.string().max(255).required().messages({
    "any.required": "⚠ The content is required.",
    "string.empty": "⚠ Please state the content.",
    "string.max": "⚠ This content is too long.",
  }),
  tools: Joi.string().max(100).required().messages({
    "string.empty": "⚠ Please state the used tools.",
    "any.required": "⚠ The tools are required.",
    "string.max": "⚠ This tools are too much.",
  }),
  link: Joi.string().max(500).required().messages({
    "string.max": "⚠ Your link is too long.",
    "any.required": "⚠ A nice link is required.",
    "string.empty": "⚠ Please write a link.",
  }),
  playground_id: Joi.string()
    .max(50)
    .pattern(/^[0-9]/)
    .required()
    .messages({
      "string.max": "⚠ Your id is too long.",
      "any.required": "⚠ A nice id is required.",
      "string.empty": "⚠ Please write the id.",
    }),
});

export const validatePlayground: RequestHandler<{
  name: string;
  content: string;
  tools: string;
  link: string;
  playground_id: string;
}> = (req, res, next) => {
  const { name, content, tools, link, playground_id } = req.body;
  const { error } = userSchema.validate(
    { name, content, tools, link, playground_id },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error });
    console.log("error details", error.details);
  } else {
    next();
  }
};
