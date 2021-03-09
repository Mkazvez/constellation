const consola = require('consola')
const { UserAccount } = require('../models')

module.exports.getUserAccounts = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'name', 'surName', 'familia', 'idFlat', 'blocked', 'dateBlocked'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const useraccount = await UserAccount.findAll(reqQuery)
    res.json(useraccount)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getUserAccount = async (req, res) => {
  try {
    const useraccount = await UserAccount.findByPk(req.params.id)
    res.json(useraccount)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addUserAccount = async (req, res) => {
  try {
    const { name, surName, familia, idFlat, blocked, dateBlocked } = req.body
    const useraccount = await UserAccount.create({ name, surName, familia, idFlat, blocked, dateBlocked})
    res.status(201).json(useraccount)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateUserAccount = async (req, res) => {
  try {
    const { name, surName, familia, idFlat, blocked, dateBlocked } = req.body
    const useraccount = await UserAccount.update(
      { name, surName, familia, idFlat, blocked, dateBlocked },
      { where: { id: req.params.id } }
    )
    res.status(201).json(useraccount)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteUserAccount = async (req, res) => {
  consola.info(req)
  try {
    await UserAccount.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
