const consola = require('consola')
const { TypeStreet } = require('../models')

module.exports.getTypeStreets = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeStreet = await TypeStreet.findAll(reqQuery)
    res.json(typeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeStreet = async (req, res) => {
  try {
    const typeStreet = await TypeStreet.findByPk(req.params.id)
    res.json(typeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeStreet = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeStreet = await TypeStreet.create({
      shottitle,
      title,
      description
    })
    res.status(201).json(typeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeStreet = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeStreet = await TypeStreet.update(
      { shottitle, title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(typeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteTypeStreet = async (req, res) => {
  consola.info(req)
  try {
    await TypeStreet.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
