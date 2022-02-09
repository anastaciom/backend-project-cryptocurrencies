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
      partialsDir: path.resolve(__dirname, "../src/resources/emailTemplateForgotPassword/"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../src/resources/emailTemplateForgotPassword/"),
    extName: ".handlebars",
  }))

const ReceivedInfo = async (from, to, name, token) => {
  const email = await transport.sendMail({
    from: from,
    to: to,
    subject: `🚀 CryptoDash - Password recovery`,
    attachments: [{
      filename: 'logo1.png',
      path: path.resolve(__dirname, "../src/resources/images/logo1.png"),
      cid: 'logo1'
    }],
    context: { name, token },
    template: 'emailForgetPassword'
  })
  return `Message id: ${email.messageId}`
}

module.exports = ReceivedInfo