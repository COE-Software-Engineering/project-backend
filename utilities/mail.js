import nodemailer from "nodemailer";
import dotenv from "dotenv";

// configuring environment variables
dotenv.config();

/**
 * Send message to an email account
 * @param emailAddress the address of the email account to send the mail to
 * @param message the message to send to the email address
 */
function sendMail(emailAddress, message){
    let trnsporter = nodemailer.createTransport({
        service: process.env.APP_EMAIL_SERVICE,
        port: 465,
        secure: true,
        auth: {
            user: process.env.APP_EMAIL_ADDRESS,
            password: process.env.APP_EMAIL_PASSWORD
        }
    })
}