'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      confirmEmail: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        defaultValue: 'user',
        type: Sequelize.STRING
      },
      firstName: Sequelize.STRING,
      patronymicName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users')
  }
}
