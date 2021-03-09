const consola = require('consola')
const { AccountFull } = require('../models')

module.exports.getAccountFulls = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idAccount', 'idFlat', 'procent', 'sq'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const accountfulls = await AccountFull.findAll(reqQuery)
    res.json(accountfulls)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getAccountFull = async (req, res) => {
  try {
    const accountfull = await AccountFull.findByPk(req.params.id)
    res.json(accountfull)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addAccountFull = async (req, res) => {
  try {
    const { idAccount, idFlat, procent, sq } = req.body
    const accountfull = await AccountFull.create({
      idAccount,
      idFlat,
      procent,
      sq
    })
    res.status(201).json(accountfull)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateAccountFull = async (req, res) => {
  try {
    const { idAccount, idFlat, procent, sq } = req.body
    const accountfull = await AccountFull.update(
      { idAccount, idFlat, procent, sq },
      { where: { id: req.params.id } }
    )
    res.status(201).json(accountfull)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteAccountFull = async (req, res) => {
  try {
    await AccountFull.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
