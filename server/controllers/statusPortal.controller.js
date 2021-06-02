const consola = require('consola')
const { StatusPortal } = require('../models')

module.exports.getStatusPortals = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'defaultDate'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const statusportals = await StatusPortal.findAll(reqQuery)
    res.json(statusportals)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getStatusPortal = async (req, res) => {
  try {
    const statusportal = await StatusPortal.findByPk(req.params.id)
    res.json(statusportal)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addStatusPortal = async (req, res) => {
  try {
    const { defaultDate } = req.body
    const statusportal = await StatusPortal.create({
      defaultDate
    })
    res.status(201).json(statusportal)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateStatusPortal = async (req, res) => {
  try {
    const { defaultDate } = req.body
    const statusportal = await StatusPortal.update(
      { defaultDate },
      { where: { id: req.params.id } }
    )
    res.status(201).json(statusportal)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteStatusPortal = async (req, res) => {
  try {
    await StatusPortal.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
