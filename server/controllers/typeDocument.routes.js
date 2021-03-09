const consola = require('consola')
const { TypeDocument } = require('../models')

module.exports.getTypeDocuments = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'description', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const typeDocument = await TypeDocument.findAll(reqQuery)
    res.json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getTypeDocument = async (req, res) => {
  try {
    const typeDocument = await TypeDocument.findByPk(req.params.id)
    res.json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addTypeDocument = async (req, res) => {
  try {
    const { title, description } = req.body
    const typeDocument = await TypeDocument.create({ title, description })
    res.status(201).json(typeDocument)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateTypeDocument = async (req, res) => {
  try {
    const { title, description } = req.body
    const typeDocument = await TypeDocument.update(
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
    await TypeDocument.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
