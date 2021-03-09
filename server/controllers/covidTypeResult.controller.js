const consola = require('consola')
const { CovidTypeResult } = require('../models')

module.exports.getCovidTypeResults = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidTypeResult = await CovidTypeResult.findAll(reqQuery)
    res.json(covidTypeResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidTypeResult = async (req, res) => {
  try {
    const covidTypeResult = await CovidTypeResult.findByPk(req.params.id)
    res.json(covidTypeResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidTypeResult = async (req, res) => {
  try {
    const { title } = req.body
    const covidTypeResult = await CovidTypeResult.create({
      title
    })
    res.status(201).json(covidTypeResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidTypeResult = async (req, res) => {
  try {
    const { title } = req.body
    const covidTypeResult = await CovidTypeResult.update(
      { title },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidTypeResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidTypeResult = async (req, res) => {
  consola.info(req)
  try {
    await CovidTypeResult.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
