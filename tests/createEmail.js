const nodemailer = require('nodemailer');
require('dotenv/config');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP
  }
});

transport.use('compile', hbs({
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "../src/resources/emailTemplate/"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../src/resources/emailTemplate/"),
  extName: ".handlebars",
}))

const ReceivedInfo = async (from, to, name) => {
  const email = await transport.sendMail({
    from: from,
    to: to,
    subject: `👋 Welcome ${name} to cryptoDash 🚀`,
    attachments: [{
      filename: 'logo1.png',
      path: path.resolve(__dirname, "../src/resources/emailTemplate/images/logo1.png"),
      cid: 'logo1'
    }],
    context: { name },
    template: 'email'
  })
  return `Message id: ${email.messageId}`
}

module.exports = ReceivedInfo