const consola = require('consola')
const { CovidReqLine } = require('../models')

module.exports.getCovidReqLines = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'datePlan', 'idAdresTest', 'idReq', 'idEmployee', 'emailRespon', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidReqLine = await CovidReqLine.findAll(reqQuery)
    res.json(covidReqLine)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidReqLine = async (req, res) => {
  try {
    const covidReqLine = await CovidReqLine.findByPk(req.params.id)
    res.json(covidReqLine)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidReqLine = async (req, res) => {
  try {
    const { datePlan, idAdresTest, idReq, idEmployee, emailRespon } = req.body
    const covidReqLine = await CovidReqLine.create({
      	datePlan, 
	idAdresTest, 
	idReq, 
	idEmployee, 
	emailRespon
    })
    res.status(201).json(covidReqLine)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidReqLine = async (req, res) => {
  try {
    const { datePlan, idAdresTest, idReq, idEmployee, emailRespon } = req.body
    const covidReqLine = await CovidReqLine.update(
      { datePlan, idAdresTest, idReq, idEmployee, emailRespon },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidReqLine)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidReqLine = async (req, res) => {
  consola.info(req)
  try {
    await CovidReqLine.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
