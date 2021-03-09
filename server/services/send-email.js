require('dotenv').config()
const SendEmail = require('../config/email')

module.exports.checkEmail = async (to, uuidKey) => {
  const subject = 'Регистрация на сайте'
  const text = `Для проверки email-адреса пройдите по ссылке:\n
    ${process.env.BASE_URL}/auth-check/confirmation-email/?key=${uuidKey}`

  const email = new SendEmail()
  await email.send(to, subject, text)
}

module.exports.forgotPassword = async (to, uuidKey) => {
  const subject = 'Восстановление пароля'
  const text = `Для восстановления пароля пройдите по ссылке:\n
    ${process.env.BASE_URL}/auth-check/recovery-password/?key=${uuidKey}`

  const email = new SendEmail()
  await email.send(to, subject, text)
}
