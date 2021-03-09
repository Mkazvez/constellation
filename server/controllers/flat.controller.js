const consola = require('consola')
const { Flat } = require('../models')
const { V_Flat } = require('../models')

module.exports.getFlats = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idHouse', 'number', 'build', 'litera'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const flats = await Flat.findAll(reqQuery)
    res.json(flats)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getV_Flats = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idHouse', 'number', 'build', 'litera', 'nameHouse'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const v_flats = await V_Flat.findAll(reqQuery)
    res.json(v_flats)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}


module.exports.getFlat = async (req, res) => {
  try {
    const flat = await Flat.findByPk(req.params.id)
    res.json(flat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addFlat = async (req, res) => {
  try {
    const { idHouse, number, build, litera } = req.body
    const flat = await Flat.create({ idHouse, number, build, litera })
    res.status(201).json(flat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateFlat = async (req, res) => {
  try {
    const { idHouse, number, build, litera } = req.body
    const flat = await Flat.update(
      { idHouse, number, build, litera },
      { where: { id: req.params.id } }
    )
    res.status(201).json(flat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteFlat = async (req, res) => {
  try {
    await Flat.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

