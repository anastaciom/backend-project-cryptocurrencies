require('dotenv/config')
const nodemailer = require('nodemailer');

//email - Production

const transport = nodemailer.createTransport({
    host: "",
    port: '',
    auth: {
      user: "",
      pass: ""
    }
  });

const ReceivedInfo = async (from, to, name) =>{
  await transport.sendMail({
        from: from,
        to: to,
        subject: `Welcome ${name} !!! `,
        html: '<h1>Hii Hello World!!!</h1>'
    })
}

  module.exports = ReceivedInfo