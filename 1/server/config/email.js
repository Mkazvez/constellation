require('dotenv').config()
const nodemailer = require('nodemailer')
const consola = require('consola')

class Email {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  async send(to, subject, text) {
    try {
      const emailOptions = { from: process.env.EMAIL_USER, to, subject, text }
      await this.transporter.sendMail(emailOptions)
    } catch (err) {
      consola.error(err)
    }
  }
}

module.exports = Email
