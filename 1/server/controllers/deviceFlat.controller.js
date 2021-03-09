const consola = require('consola')
const { DeviceFlat } = require('../models')

module.exports.getDeviceFlats = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'idFlat' , 'idDevice' ],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const deviceflats = await DeviceFlat.findAll(reqQuery)
    res.json(deviceflats)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDeviceFlat = async (req, res) => {
  try {
    const deviceflat = await DeviceFlat.findByPk(req.params.id)
    res.json(deviceflat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDeviceFlat = async (req, res) => {
  try {
    const { idFlat , idDevice } = req.body
    const deviceflat = await DeviceFlat.create({ idFlat , idDevice })
    res.status(201).json(deviceflat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDeviceFlat = async (req, res) => {
  try {
    const { idFlat , idDevice } = req.body
    const deviceflat = await DeviceFlat.update(
      { idFlat , idDevice },
      { where: { id: req.params.id } }
    )
    res.status(201).json(deviceflat)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDeviceFlat = async (req, res) => {
  try {
    await DeviceFlat.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

