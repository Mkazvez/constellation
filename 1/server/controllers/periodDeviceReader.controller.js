const consola = require('consola')
const { PeriodDeviceReader } = require('../models')

module.exports.getPeriodDeviceReaders = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'dateReader', 'period', 'reader', 'idDeviceFlat'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const perioddevicereaders = await PeriodDeviceReader.findAll(reqQuery)
    res.json(perioddevicereaders)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getPeriodDeviceReader = async (req, res) => {
  try {
    const perioddevicereader = await PeriodDeviceReader.findByPk(req.params.id)
    res.json(perioddevicereader)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addPeriodDeviceReader = async (req, res) => {
  try {
    const { idHouse, idServiceManafacture } = req.body
    const perioddevicereader = await PeriodDeviceReader.create({ dateReader, period, reader, idDeviceFlat })
    res.status(201).json(perioddevicereader)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updatePeriodDeviceReader = async (req, res) => {
  try {
    const { dateReader, period, reader, idDeviceFlat } = req.body
    const perioddevicereader = await PeriodDeviceReader.update(
      { dateReader, period, reader, idDeviceFlat },
      { where: { id: req.params.id } }
    )
    res.status(201).json(perioddevicereader)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deletePeriodDeviceReader = async (req, res) => {
  try {
    await PeriodDeviceReader.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

