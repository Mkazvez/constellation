const consola = require('consola')
const { TypeResurs } = require('../models')

module.exports.getTypeResurss = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeResurs = await TypeResurs.findAll(reqQuery)
    res.json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeResurs = async (req, res) => {
  try {
    const typeResurs = await TypeResurs.findByPk(req.params.id)
    res.json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeResurs = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeResurs = await TypeResurs.create({ shottitle, title, description })
    res.status(201).json(typeResurs)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeResurs = async (req, res) => {
  try {
    const { shottitle, title, description } = req.body
    const typeResurs = await TypeResurs.update(
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
    await TypeResurs.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
