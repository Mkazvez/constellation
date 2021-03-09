const consola = require('consola')
const { Op } = require('sequelize')
const { User } = require('../models')

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: { [Op.ne]: 'admin' } },
      attributes: { exclude: ['password'] }
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.update(
      {
        firstName: req.body.firstName,
        patronymicName: req.body.patronymicName,
        lastName: req.body.lastName
      },
      { where: { id: req.params.id } }
    )
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.activateUser = async (req, res) => {
  try {
    const user = await User.update(
      { active: req.body.active },
      { where: { id: req.params.id } }
    )
    res.status(201).json(user.active)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
