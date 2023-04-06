import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SENDIN,
  port: Number(process.env.SMTP_PORT_SENDIN) || 25, // Explicitly specify type as number
  secure: false,
  auth: {
    user: process.env.SMTP_SENDIN_USER,
    pass: process.env.SMTP_SENDIN_PASSWORD,
  },
});

export default transporter;
