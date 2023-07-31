import nodemailer from "nodemailer";
import dotenv from "dotenv";

// configuring environment variables
dotenv.config();

/**
 * Send message to an email account
 * @param emailAddress the address of the email account to send the mail to
 * @param message the message to send to the email address
 */
async function sendMail(emailAddress, subject, message, messageHTML) {
  let transporter = nodemailer.createTransport({
    service: process.env.APP_EMAIL_SERVICE,
    host: process.env.APP_EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL_ADDRESS,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.APP_EMAIL_ADDRESS,
    to: emailAddress,
    subject: subject,
    text: message,
    html: messageHTML,
  });

  return info;
}

export async function sendPasswordOnSignup(emailAddress, password) {
  let message = `Your new Password is ${password}, you are advised to change it as soon as possible to something more convenient but secure`;
  let messageHTML = `
  Your new password: <strong>${password}</strong> <br>
  <span color='red'>You are advised to change it as soon as possible to something more convenient but secure</span>
  `;
  return await sendMail(emailAddress, "Welcome, Here's your new password", message, messageHTML);
}

/**
 * function to generate put new html into boilerplate html
 * @param html the html to augment the boilerplate
 * @return new html
 */
function htmlTemplate(html) {
  const template = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Classroom Assistant</title>
              <style>
                .container {
                  width: 100%;
                  height: 100%;
                  padding: 20px;
                  background-color: #f4f4f4;
                }
                .email {
                  width: 80%;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                }
                .email-header {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
                .email-body {
                  padding: 20px;
                }
                .email-footer {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="email">
                  <div class="email-header">
                    <h1>EMAIL HEADER</h1>
                  </div>
                  <div class="email-body">
                    ${html}
                  </div>
                  <div class="email-footer">
                    <p>EMAIL FOOTER</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;
}
