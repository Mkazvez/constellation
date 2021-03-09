const consola = require('consola')
const { CovidAdresTest } = require('../models')

module.exports.getCovidAdresTests = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'adres', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidAdresTest = await CovidAdresTest.findAll(reqQuery)
    res.json(covidAdresTest)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidAdresTest = async (req, res) => {
  try {
    const covidAdresTest = await CovidAdresTest.findByPk(req.params.id)
    res.json(covidAdresTest)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidAdresTest = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidAdresTest = await CovidAdresTest.create({
      title,
      adres
    })
    res.status(201).json(covidAdresTest)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidAdresTest = async (req, res) => {
  try {
    const { title, adres } = req.body
    const covidAdresTest = await CovidAdresTest.update(
      { title, adres },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidAdresTest)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidAdresTest = async (req, res) => {
  consola.info(req)
  try {
    await CovidAdresTest.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
