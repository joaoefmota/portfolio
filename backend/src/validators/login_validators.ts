import { RequestHandler } from "express";

export const validateLogin: RequestHandler<{
  username: string;
  email: string;
  password: string;
}> = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  // username name validation
  if (username == null || username.trim() === "") {
    errors.push({ field: "username", message: "⚠ Your username is required." });
  } else if (username.length >= 50) {
    errors.push({
      field: "username",
      message: "⚠ Your username should contain less than 50 characters",
    });
  }

  // email validation
  if (email == null || email.trim() === "") {
    errors.push({ field: "email", message: "⚠ Your valid email is required." });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "⚠ Invalid email" });
  }
  // password validation
  if (password == null || password.trim() === "") {
    errors.push({ field: "password", message: "⚠ A password is required." });
  }
  // if there are erorrs send 422 status, if not - proceed to next step
  if (errors.length > 0) {
    res.status(422).json({ validationErrors: errors });
    console.log("error details", errors);
  } else {
    next();
  }
};
