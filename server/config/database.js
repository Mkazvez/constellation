require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      socketPath: '/var/run/mysqld/mysqld.sock',
      timezone: 'Etc/GMT0'
    },
    operatorsAliases: 0,
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize'
  }
}
