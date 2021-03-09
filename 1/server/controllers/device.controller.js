const consola = require('consola')
const { Device } = require('../models')

module.exports.getDevices = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title' , 'description' , 'number' , 'idResurs' , 'idDeviceModel' , 'idMark' ],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const devices = await Device.findAll(reqQuery)
    res.json(devices)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id)
    res.json(device)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDevice = async (req, res) => {
  try {
    const { title , description , number , idResurs , idDeviceModel , idMark } = req.body
    const device = await Device.create({ title , description , number , idResurs , idDeviceModel , idMark })
    res.status(201).json(device)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDevice = async (req, res) => {
  try {
    const { title , description , number , idResurs , idDeviceModel , idMark } = req.body
    const device = await Device.update(
      { title , description , number , idResurs , idDeviceModel , idMark },
      { where: { id: req.params.id } }
    )
    res.status(201).json(device)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDevice = async (req, res) => {
  try {
    await Device.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

