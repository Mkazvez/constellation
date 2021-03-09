const moment = require('moment')
const consola = require('consola')
const { Op } = require('sequelize')
const { CheckKey } = require('../models')

module.exports = () => {
  try {
    setInterval(() => {
      CheckKey.destroy({
        where: { createdAt: { [Op.lt]: moment().subtract(12, 'h') } }
      })
    }, 1800000)
  } catch (err) {
    consola.error(err)
  }
}
