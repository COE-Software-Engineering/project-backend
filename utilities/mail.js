import nodemailer from "nodemailer";

/**
 * Send message to an email account
 * @param emailAddress the address of the email account to send the mail to
 * @param message the message to send to the email address
 */
function sendMail(emailAddress, message){
    let trnsporter = nodemailer.createTransport({
        service: "gmail",
    })
}