const consola = require('consola')
const { CovidUser } = require('../models')

module.exports.getCovidUsers = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'name', 'surName', 'familia', 'passportSeria', 'passportNumber', 'passportDate', 'passportWho', 'adres', 'adresFact', 'email', 'telephone', 'pol', 'dateBurn', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidUser = await CovidUser.findAll(reqQuery)
    res.json(covidUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getCovidUser = async (req, res) => {
  try {
    const covidUser = await CovidUser.findByPk(req.params.id)
    res.json(covidUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addCovidUser = async (req, res) => {
  try {
    const { name, surName, familia, passportSeria, passportNumber, passportDate, passportWho, adres, adresFact, email, telephone, pol, dateBurn } = req.body
    const covidUser = await CovidUser.create({
      name, 
      surName, 
      familia, 
      passportSeria, 
      passportNumber, 
      passportDate, 
      passportWho, 
      adres, 
      adresFact, 
      email, 
      telephone, 
      pol, 
      dateBurn
    })
    res.status(201).json(covidUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateCovidUser = async (req, res) => {
  try {
    const { name, surName, familia, passportSeria, passportNumber, passportDate, passportWho, adres, adresFact, email, telephone, pol, dateBurn } = req.body
    const covidUser = await CovidUser.update(
      { name, surName, familia, passportSeria, passportNumber, passportDate, passportWho, adres, adresFact, email, telephone, pol, dateBurn },
      { where: { id: req.params.id } }
    )
    res.status(201).json(covidUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteCovidUser = async (req, res) => {
  consola.info(req)
  try {
    await CovidUser.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
