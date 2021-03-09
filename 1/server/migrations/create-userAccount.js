'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      familia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idFlat: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      blocked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      dateBlocked: {
        allowNull: false,
        type: Sequelize.STRING
      },
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
    return queryInterface.dropTable('UserAccounts')
  }
}
