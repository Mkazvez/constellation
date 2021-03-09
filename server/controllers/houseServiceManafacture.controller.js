const consola = require('consola')
const { HouseServiceManafacture } = require('../models')

module.exports.getHouseServiceManafactures = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idHouse', 'idServiceManafacture'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const houseservicemanafactures = await HouseServiceManafacture.findAll(reqQuery)
    res.json(houseservicemanafactures)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getHouseServiceManafacture = async (req, res) => {
  try {
    const houseservicemanafacture = await HouseServiceManafacture.findByPk(req.params.id)
    res.json(houseservicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addHouseServiceManafacture = async (req, res) => {
  try {
    const { idHouse, idServiceManafacture } = req.body
    const houseservicemanafacture = await HouseServiceManafacture.create({ idHouse, idServiceManafacture })
    res.status(201).json(houseservicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateHouseServiceManafacture = async (req, res) => {
  try {
    const { idHouse, idServiceManafacture } = req.body
    const houseservicemanafacture = await HouseServiceManafacture.update(
      { idHouse, idServiceManafacture },
      { where: { id: req.params.id } }
    )
    res.status(201).json(houseservicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteHouseServiceManafacture = async (req, res) => {
  try {
    await HouseServiceManafacture.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

