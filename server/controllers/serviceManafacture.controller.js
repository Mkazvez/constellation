const consola = require('consola')
const { ServiceManafacture } = require('../models')

module.exports.getServiceManafactures = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'shottitle',
      'title',
      'description',
      'adres',
      'email',
      'url',
      'urlAdmin'
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
    const servicemanafactures = await ServiceManafacture.findAll(reqQuery)
    res.json(servicemanafactures)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getServiceManafacture = async (req, res) => {
  try {
    const servicemanafacture = await ServiceManafacture.findByPk(req.params.id)
    res.json(servicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addServiceManafacture = async (req, res) => {
  try {
    const {
      shottitle,
      title,
      description,
      adres,
      email,
      url,
      urlAdmin
    } = req.body
    const servicemanafacture = await ServiceManafacture.create({
      shottitle,
      title,
      description,
      adres,
      email,
      url,
      urlAdmin
    })
    res.status(201).json(servicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateServiceManafacture = async (req, res) => {
  try {
    const {
      shottitle,
      title,
      description,
      adres,
      email,
      url,
      urlAdmin
    } = req.body
    const servicemanafacture = await ServiceManafacture.update(
      { shottitle, title, description, adres, email, url, urlAdmin },
      { where: { id: req.params.id } }
    )
    res.status(201).json(servicemanafacture)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteServiceManafacture = async (req, res) => {
  try {
    await ServiceManafacture.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
