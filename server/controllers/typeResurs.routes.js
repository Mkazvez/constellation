const consola = require('consola')
const { Typeresurs } = require('../models')

module.exports.getTypeResurss = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeResurs1 = await Typeresurs.findAll(reqQuery)
    res.json(typeResurs1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeResurs = async (req, res) => {
  try {
    const typeResurs = await Typeresurs.findByPk(req.params.id)
    res.json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeResurs = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeResurs = await Typeresurs.create({ shottitle, title, description })
    res.status(201).json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeResurs = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeResurs = await Typeresurs.update(
      { shottitle, title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteTypeResurs = async (req, res) => {
  consola.info(req)
  try {
    await Typeresurs.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
