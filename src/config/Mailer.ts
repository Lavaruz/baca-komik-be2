import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const MAILER_EMAIL= process.env.MAILER_EMAIL
const MAILER_PASSWORD= process.env.MAILER_PASSWORD

// buat transport mailer agar dia bisa mengirim email dari server
// smtp dan post bisa saja berubah tergantung host yang digunakan
export default nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});