const consola = require('consola')
const { typeStreet } = require('../models')

module.exports.getTypeStreets = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const TypeStreet = await typeStreet.findAll(reqQuery)
    res.json(TypeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeStreet = async (req, res) => {
  try {
    const TypeStreet = await typeStreet.findByPk(req.params.id)
    res.json(TypeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeStreet = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const TypeStreet = await typeStreet.create({
      shottitle,
      title,
      description
    })
    res.status(201).json(TypeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeStreet = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const TypeStreet = await typeStreet.update(
      { shottitle, title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(TypeStreet)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteTypeStreet = async (req, res) => {
  consola.info(req)
  try {
    await typeStreet.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
