const consola = require('consola')
const { accountFull } = require('../models')
const { v_accounts } = require('../models')

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
    const accountfulls = await accountFull.findAll(reqQuery)
    res.json(accountfulls)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getv_accounts = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idAccount', 'idFlat', 'procent', 'sq', 'nameFlat'],
    order: [['idAccount', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const vaccounts = await v_accounts.findAll(reqQuery)
    res.json(vaccounts)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getAccountFull = async (req, res) => {
  try {
    const accountfull1 = await accountFull.findByPk(req.params.id)
    res.json(accountfull1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addAccountFull = async (req, res) => {
  try {
    const { idAccount, idFlat, procent, sq } = req.body
    const accountfull1 = await accountFull.create({
      idAccount,
      idFlat,
      procent,
      sq
    })
    res.status(201).json(accountfull1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateAccountFull = async (req, res) => {
  try {
    const { idAccount, idFlat, procent, sq } = req.body
    const accountfull1 = await accountFull.update(
      { idAccount, idFlat, procent, sq },
      { where: { id: req.params.id } }
    )
    res.status(201).json(accountfull1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteAccountFull = async (req, res) => {
  try {
    await accountFull.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
