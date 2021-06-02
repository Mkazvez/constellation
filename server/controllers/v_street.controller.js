const consola = require('consola')
const { v_street } = require('../models')

module.exports.getV_Streets = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'title',
      'shotTypeStreet',
      'shotNameTypeStreet',
      'NameTypeStreet',
      'NameRegion',
      'Description'
    ],
    order: ['id']
  }
  try {
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const v_street1 = await v_street.findAll(reqQuery)
    res.json(v_street1)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

