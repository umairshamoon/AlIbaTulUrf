const nodemailer = require('nodemailer')
const { GMAIL_USERNAME, GMAIL_PASSWORD } = require('../config')
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: GMAIL_USERNAME,
    pass: GMAIL_PASSWORD,
  },
})

const sendMail = async (email, secretToken, mode) => {
  try {
    if (mode == 'OTP') {
      return await transport.sendMail({
        from: GMAIL_USERNAME,
        to: email,
        subject: 'OTP Submission',
        html: `
        <h1>Reset Password</h1>
        <p> Here is your otp to change the password ${secretToken} </p>
      `,
      })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = sendMail
