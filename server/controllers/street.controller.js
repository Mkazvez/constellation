const consola = require('consola')
const { Street } = require('../models')
//const { v_street } = require('../models')

module.exports.getStreets = async (req, res) => {
  const reqQuery = {
    attributes: ['id', 'title', 'description', 'idTypeStreet', 'idRegion', 'createdAt'],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const covidUser = await Street.findAll(reqQuery)
    res.json(covidUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

// module.exports.getV_Streets = async (req, res) => {
//   const reqQuery = {
//     attributes: [
//       'id',
//       'title',
//       'shotTypeStreet',
//       'shotNameTypeStreet',
//       'NameTypeStreet',
//       'NameRegion',
//       'Description'
//       ],
//     order: ['id']
//   }
//   try {
//     const { value } = req.query
//     if (value) reqQuery.limit = +value
//     const v_street1 = await v_street.findAll(reqQuery)
//     res.json(v_street1)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//     consola.error(err)
//   }
// }


module.exports.getStreet = async (req, res) => {
  try {
    const street = await Street.findByPk(req.params.id)
    res.json(street)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addStreet = async (req, res) => {
  try {
    const { title, description, idTypeStreet, idRegion } = req.body
    const street = await Street.create({
      title, description, idTypeStreet, idRegion
    })
    res.status(201).json(street)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateStreet = async (req, res) => {
  try {
    const { title, description, idTypeStreet, idRegion } = req.body
    const street = await Street.update(
      { title, description, idTypeStreet, idRegion },
      { where: { id: req.params.id } }
    )
    res.status(201).json(street)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteStreet = async (req, res) => {
  consola.info(req)
  try {
    await Street.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
