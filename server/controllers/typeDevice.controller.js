const consola = require('consola')
const { Typedevice } = require('../models')

module.exports.gettypeDevices = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeDevice1 = await Typedevice.findAll(reqQuery)
    res.json(typeDevice1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.gettypeDevice = async (req, res) => {
  try {
    const typeDevice = await Typedevice.findByPk(req.params.id)
    res.json(typeDevice)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addtypeDevice = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeDevice = await Typedevice.create({ shottitle, title, description })
    res.status(201).json(typeDevice)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updatetypeDevice = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeDevice = await Typedevice.update(
      { shottitle, title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(typeDevice)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deletetypeDevice = async (req, res) => {
  consola.info(req)
  try {
    await typedevice.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
