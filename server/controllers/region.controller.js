const consola = require('consola')
const { Region } = require('../models')

module.exports.getRegions = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'fias', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const region = await Region.findAll(reqQuery)
    res.json(region)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getRegion = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id)
    res.json(region)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addRegion = async (req, res) => {
  try {
    const { title, fias } = req.body
    const region = await Region.create({ title, fias })
    res.status(201).json(region)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateRegion = async (req, res) => {
  try {
    const { title, fias } = req.body
    const region = await Region.update(
      { title, fias },
      { where: { id: req.params.id } }
    )
    res.status(201).json(region)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteRegion = async (req, res) => {
  consola.info(req)
  try {
    await Region.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
