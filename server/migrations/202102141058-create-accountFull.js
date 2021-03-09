'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accountFulls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAccount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idFlat: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      procent: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      sq: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('accountFulls')
  }
}
