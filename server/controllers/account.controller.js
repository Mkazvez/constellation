const consola = require('consola')
const { Op } = require('sequelize')
const { Account } = require('../models')
const { V_Accountuser } = require('../models')

module.exports.getAccounts = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idUser', 'idAccount', 'confirm'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const accounts = await Account.findAll(reqQuery)
    res.json(accounts)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getv_accountusers = async (req, res) => {
  const iduserf = req.query.idUser
  const condition = iduserf ? { idUser: iduserf } : null
  // eslint-disable-next-line no-console
  console.log(condition, req.query)
  const reqQuery = {
    attributes: [
      'id',
      'idUser',
      'firstName',
      'patronymicName',
      'lastName',
      'idAccountFull',
      'idAccount',
      'nameFlat',
      'email',
      'confirm'
    ],
    order: [['idUser']],
    where: condition
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const vaccountusers = await V_Accountuser.findAll(reqQuery)
    res.json(vaccountusers)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id)
    res.json(account)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addAccount = async (req, res) => {
  try {
    const { idAccount, idUser, confirm } = req.body
    const account = await Account.create({
      idAccount,
      idUser,
      confirm
    })
    res.status(201).json(account)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateAccount = async (req, res) => {
  try {
    const { idAccount, idUser, confirm } = req.body
    const account = await Account.update(
      { idAccount, idUser, confirm },
      { where: { id: req.params.id } }
    )
    res.status(201).json(account)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteAccount = async (req, res) => {
  try {
    await Account.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
