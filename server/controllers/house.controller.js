const consola = require('consola')
const { House } = require('../models')
const { v_house } = require('../models')

module.exports.getHouses = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idStreet', 'title', 'number', 'build', 'litera'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const houses = await House.findAll(reqQuery)
    res.json(houses)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getV_Houses = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'shotTypeStreet',
      'titleStreet',
      'title',
      'number',
      'build',
      'litera'
    ],
    order: [['id', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const v_houses1 = await v_house.findAll(reqQuery)
    res.json(v_houses1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getHouse = async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id)
    res.json(house)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addHouse = async (req, res) => {
  try {
    const { idStreet, title, number, build, litera } = req.body
    const house = await House.create({ idStreet, title, number, build, litera })
    res.status(201).json(house)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateHouse = async (req, res) => {
  try {
    const { idStreet, title, number, build, litera } = req.body
    const house = await House.update(
      { idStreet, title, number, build, litera },
      { where: { id: req.params.id } }
    )
    res.status(201).json(house)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteHouse = async (req, res) => {
  try {
    await House.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
