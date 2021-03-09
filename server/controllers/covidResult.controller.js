const consola = require('consola')
const { CovidResult } = require('../models')
const { V_CovidResult } = require('../models')

module.exports.getCovidResults = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'dateResult',
      'fioTmp',
      'idTypeResult',
      'idReqLine',
      'idEmployee',
      'createdAt'
    ],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidResult = await CovidResult.findAll(reqQuery)
    res.json(covidResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getV_CovidResults = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'dateResult',
      'fioTmp',
      'titleTypeResult', 
      'Familia', 
      'name', 
      'surName', 
      'pol', 
      'dateBurn',
      'datePlan'
    ],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const v_covidResult = await V_CovidResult.findAll(reqQuery)
    res.json(v_covidResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}


module.exports.getCovidResult = async (req, res) => {
  try {
    const covidResult = await CovidResult.findByPk(req.params.id)
    res.json(covidResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidResult = async (req, res) => {
  try {
    const { dateResult, fioTmp, idTypeResult, idReqLine, idEmployee } = req.body
    console.log(req.body,idEmployee)
    const covidResult = await CovidResult.create({
      dateResult,
      fioTmp,
      idTypeResult,
      idReqLine,
      idEmployee
    })
    res.status(201).json(covidResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidResult = async (req, res) => {
  try {
    const { dateResult, fioTmp, idTypeResult, idReqLine, idEmployee } = req.body
    const covidResult = await CovidResult.update(
      { dateResult, fioTmp, idTypeResult, idReqLine, idEmployee },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidResult = async (req, res) => {
  consola.info(req)
  try {
    await CovidResult.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
