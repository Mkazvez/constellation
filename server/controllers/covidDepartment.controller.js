const consola = require('consola')
const { CovidDepartment } = require('../models')

module.exports.getCovidDepartments = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'adres', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidDepartment = await CovidDepartment.findAll(reqQuery)
    res.json(covidDepartment)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidDepartment = async (req, res) => {
  try {
    const covidDepartment = await CovidDepartment.findByPk(req.params.id)
    res.json(covidDepartment)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidDepartment = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidDepartment = await CovidDepartment.create({
      title,
      adres
    })
    res.status(201).json(covidDepartment)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidDepartment = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidDepartment = await CovidDepartment.update(
      { title, adres },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidDepartment)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidDepartment = async (req, res) => {
  consola.info(req)
  try {
    await covidDepartment.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
