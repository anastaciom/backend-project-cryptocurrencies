const nodemailer = require('nodemailer');
require('dotenv/config')

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP
  }
});

const ReceivedInfo = async (from, to, name) => {
  const email = await transport.sendMail({
    from: from,
    to: to,
    subject: `Welcome ${name} !!! `,
    html: '<h1>Hello World!!!</h1>'
  })
  return `Message id: ${email.messageId}`
}

module.exports = ReceivedInfo