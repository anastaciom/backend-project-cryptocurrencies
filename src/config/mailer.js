const nodemailer = require('nodemailer');
require('dotenv/config');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const {google} = require('googleapis');


const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID_GOOGLE, process.env.CLIENT_SECRET_GOOGLE, process.env.REDIRECT_URI_GOOGLE)

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN_GOOGLE})

  async function sendEmail(to, name){

    try{
        const accessToken = await oAuth2Client.getAccessToken()
        
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: 'oauth2',
          user: process.env.USER_EMAIL,
          clientId: process.env.CLIENT_ID_GOOGLE,
          clientSecret: process.env.CLIENT_SECRET_GOOGLE,
          refreshToken: process.env.REFRESH_TOKEN_GOOGLE,
          accessToken: accessToken
        }
      });
      transport.use('compile', hbs({
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname, "../resources/emailTemplate/"),
          defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, "../resources/emailTemplate/"),
        extName: ".handlebars",
      }))

       transport.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: `👋 Welcome ${name} to cryptoDash 🚀`,
        attachments: [{
          filename: 'logo1.png',
          path: path.resolve(__dirname, "../resources/emailTemplate/images/logo1.png"),
          cid: 'logo1'
        }],
        context: { name },
        template: 'email'
      })
  
    }catch(err){
      console.log(err)
    }
  }






  


module.exports = sendEmail