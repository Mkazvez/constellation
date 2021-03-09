const consola = require('consola')
const { CovidAdresWork } = require('../models')

module.exports.getCovidAdresWorks = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'adres', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidAdresWork = await CovidAdresWork.findAll(reqQuery)
    res.json(covidAdresWork)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidAdresWork = async (req, res) => {
  try {
    const covidAdresWork = await CovidAdresWork.findByPk(req.params.id)
    res.json(covidAdresWork)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidAdresWork = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidAdresWork = await CovidAdresWork.create({
      title,
      adres
    })
    res.status(201).json(covidAdresWork)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidAdresWork = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidAdresWork = await CovidAdresWork.update(
      { title, adres },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidAdresWork)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidAdresWork = async (req, res) => {
  consola.info(req)
  try {
    await CovidAdresWork.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
