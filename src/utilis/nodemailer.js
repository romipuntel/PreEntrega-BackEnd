import nodemailer from 'nodemailer'
import config from '../config/indexConfig.js'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail_user,
        pass: config.gmail_password
    }
})

const sendMailTo = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.gmail_user || "Tiendita",
        to,
        subject,
        text,
    };
    return await transporter.sendMail(mailOptions);
};

export default sendMailTo;