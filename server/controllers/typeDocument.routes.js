const consola = require('consola')
const { Typedocument } = require('../models')

module.exports.getTypeDocuments = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeDocument1 = await Typedocument.findAll(reqQuery)
    res.json(typeDocument1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeDocument = async (req, res) => {
  try {
    const typeDocument = await Typedocument.findByPk(req.params.id)
    res.json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeDocument = async (req, res) => {
  try {
    const { title, description } = req.body
    const typeDocument = await Typedocument.create({ title, description })
    res.status(201).json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeDocument = async (req, res) => {
  try {
    const { title, description } = req.body
    const typeDocument = await Typedocument.update(
      { title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteTypeDocument = async (req, res) => {
  consola.info(req)
  try {
    await Typedocument.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
