const consola = require('consola')
const { DeviceModel } = require('../models')

module.exports.getDeviceModels = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'shottitle' , 'title', 'description' ],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const devicemodels = await DeviceModel.findAll(reqQuery)
    res.json(devicemodels)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDeviceModel = async (req, res) => {
  try {
    const devicemodel = await DeviceModel.findByPk(req.params.id)
    res.json(devicemodel)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDeviceModel = async (req, res) => {
  try {
    const { shottitle , title, description } = req.body
    const devicemodel = await DeviceModel.create({ shottitle , title, description })
    res.status(201).json(devicemodel)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDeviceModel = async (req, res) => {
  try {
    const { shottitle , title, description } = req.body
    const devicemodel = await DeviceModel.update(
      { shottitle , title, description },
      { where: { id: req.params.id } }
    )
    res.status(201).json(devicemodel)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDeviceModel = async (req, res) => {
  try {
    await DeviceModel.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

