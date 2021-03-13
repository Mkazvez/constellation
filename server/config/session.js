require('dotenv').config()
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('../models')

module.exports = session({
  secret: process.env.SECRET_KEY,
  store: new SequelizeStore({
    db: db.sequelize,
    disableTouch: true
  }),
  saveUninitialized: false,
  resave: false
})
