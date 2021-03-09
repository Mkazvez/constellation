const consola = require('consola')
const { CovidReq } = require('../models')

module.exports.getCovidReqs = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'datePlan', 'idAdresTest', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidReq = await CovidReq.findAll(reqQuery)
    res.json(covidReq)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidReq = async (req, res) => {
  try {
    const covidReq = await CovidReq.findByPk(req.params.id)
    res.json(covidReq)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidReq = async (req, res) => {
  try {
    const { datePlan, idAdresTest } = req.body
    const covidReq = await CovidReq.create({
      datePlan,
      idAdresTest
    })
    res.status(201).json(covidReq)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidReq = async (req, res) => {
  try {
    const { datePlan, idAdresTest } = req.body
    const covidReq = await CovidReq.update(
      { datePlan, idAdresTest },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidReq)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidReq = async (req, res) => {
  consola.info(req)
  try {
    await CovidReq.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
