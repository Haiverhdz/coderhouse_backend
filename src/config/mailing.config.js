import nodemailer from "nodemailer"
import entorno from "./env.js";

const transport = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user: entorno.mail_username,
        pass: entorno.mail_password
    },
});

export default transport;