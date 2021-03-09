const consola = require('consola')
const { CovidEmployee } = require('../models')
const { V_CovidEmployee } = require('../models')

module.exports.getCovidEmployees = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'tabelNumber', 'idAdresWork', 'idDepartment', 'idUser', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidEmployee = await CovidEmployee.findAll(reqQuery)
    res.json(covidEmployee)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getV_CovidEmployees = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'tabelNumber', 'titleDepartment', 'adresWork', 'Familia', 'name', 'surName', 'pol', 'dateBurn'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const v_covidEmployee = await V_CovidEmployee.findAll(reqQuery)
    res.json(v_covidEmployee)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}


module.exports.getCovidEmployee = async (req, res) => {
  try {
    const covidEmployee = await CovidEmployee.findByPk(req.params.id)
    res.json(covidEmployee)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidEmployee = async (req, res) => {
  try {
    const { tabelNumber, idAdresWork, idDepartment, idUser } = req.body
    const covidEmployee = await CovidEmployee.create({
      tabelNumber, 
      idAdresWork, 
      idDepartment, 
      idUser
    })
    res.status(201).json(covidEmployee)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidEmployee = async (req, res) => {
  try {
    const { tabelNumber, idAdresWork, idDepartment, idUser } = req.body
    const covidEmployee = await CovidEmployee.update(
      { tabelNumber, idAdresWork, idDepartment, idUser },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidEmployee)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidEmployee = async (req, res) => {
  consola.info(req)
  try {
    await CovidEmployee.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
