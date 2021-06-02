const consola = require('consola')
const { DeviceResult } = require('../models')
const { v_deviceResult } = require('../models')

module.exports.getDeviceResults = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'title',
      'description',
      'idDevice',
      'period',
      'result',
      'idUser'
    ],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const deviceresults = await DeviceResult.findAll(reqQuery)
    res.json(deviceresults)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getV_deviceResults = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'titleDeviceResult',
      'numberDevice',
      'period',
      'result',
      'lperiod',
      'lresult',
      'typeResursShotTitle',
      'typeDeviceShotTitle',
      'nameFlat',
      'userFullName',
      'email',
      'period_month',
      'lperiod_month',
      'idAccountUser'
    ]
  }
  try {
    // if (req.session.user) {
    //   const { role } = req.session.user
    //   if (role === 'admin') delete reqQuery.where
    // }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const vdevice1 = await v_deviceResult.findAll({ where: req.query })
    res.json(vdevice1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDeviceResult = async (req, res) => {
  try {
    const deviceresult = await DeviceResult.findByPk(req.params.id)
    res.json(deviceresult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDeviceResult = async (req, res) => {
  try {
    const { title, description, idDevice, period, result, idUser } = req.body
    const deviceresult = await DeviceResult.create({
      title,
      description,
      idDevice,
      period,
      result,
      idUser
    })
    res.status(201).json(deviceresult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDeviceResult = async (req, res) => {
  try {
    const { title, description, idDevice, period, result, idUser } = req.body
    const deviceresult = await DeviceResult.update(
      {
        title,
        description,
        idDevice,
        period,
        result,
        idUser
      },
      { where: { id: req.params.id } }
    )
    res.status(201).json(deviceresult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDeviceResultOnly = async (req, res) => {
  try {
    const { result } = req.body
    const deviceresult = await DeviceResult.update(
      {
        result
      },
      { where: { id: req.params.id } }
    )
    res.status(201).json(deviceresult)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDeviceResult = async (req, res) => {
  try {
    await DeviceResult.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
