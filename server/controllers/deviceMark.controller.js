const consola = require('consola')
const { DeviceMark } = require('../models')

module.exports.getDeviceMarks = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'shottitle',
      'title',
      'description',
      'qtyresult',
      'qtyfractional',
      'qtymax'
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
    const devicemarks = await DeviceMark.findAll(reqQuery)
    res.json(devicemarks)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDeviceMark = async (req, res) => {
  try {
    const devicemark = await DeviceMark.findByPk(req.params.id)
    res.json(devicemark)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDeviceMark = async (req, res) => {
  try {
    const {
      shottitle,
      title,
      description,
      qtyresult,
      qtyfractional,
      qtymax
    } = req.body
    const devicemark = await DeviceMark.create({
      shottitle,
      title,
      description,
      qtyresult,
      qtyfractional,
      qtymax
    })
    res.status(201).json(devicemark)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDeviceMark = async (req, res) => {
  try {
    const {
      shottitle,
      title,
      description,
      qtyresult,
      qtyfractional,
      qtymax
    } = req.body
    const devicemark = await DeviceMark.update(
      { shottitle, title, description, qtyresult, qtyfractional, qtymax },
      { where: { id: req.params.id } }
    )
    res.status(201).json(devicemark)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDeviceMark = async (req, res) => {
  try {
    await DeviceMark.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
