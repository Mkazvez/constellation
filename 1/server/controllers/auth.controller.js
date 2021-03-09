const consola = require('consola')
const bcrypt = require('bcrypt')
const uuid = require('uuid').v4()
const { User, CheckKey } = require('../models')
const sendEmail = require('../services/send-email')

module.exports.registerUser = async (req, res) => {
  try {
    const uuidKey = uuid
    const { email, password } = req.body
    const candidate = await User.findOne({ where: { email } })
    if (candidate) return res.status(400).json(0)
    const hashPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ email, password: hashPassword })
    await CheckKey.create({ email, key: uuidKey })
    await sendEmail.checkEmail(email, uuidKey)
    res.status(201).json({ registration: user.email })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email }, raw: true })
    if (!user) return res.status(401).json({ message: 'Error auth' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Error auth' })
    delete user.password
    req.session.user = user
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.checkEmail = async (req, res) => {
  try {
    const keyFound = await CheckKey.findOne({ where: { key: req.query.key } })
    if (!keyFound) return res.redirect('/auth/registration')
    await User.update(
      { confirmEmail: true },
      { where: { email: keyFound.email } }
    )
    await keyFound.destroy()
    res.redirect('/auth')
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const uuidKey = uuid
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json(0)
    await CheckKey.create({ email, key: uuidKey })
    await sendEmail.forgotPassword(email, uuidKey)
    res.json(1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.checkKeyChangePassword = async (req, res) => {
  try {
    const keyFound = await CheckKey.findOne({ where: { key: req.query.key } })
    if (!keyFound) return res.redirect('/auth/registration')
    req.session.email = keyFound.email
    res.redirect('/auth/change-password')
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.changePassword = async (req, res) => {
  try {
    const { email } = req.session
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json(0)
    const hashPassword = await bcrypt.hash(req.body.password, 12)
    await User.update({ password: hashPassword }, { where: { email } })
    delete req.session.email
    res.status(201).json(1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.json({ message: 'logout' })
}
