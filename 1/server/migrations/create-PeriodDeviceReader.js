'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PeriodDeviceReaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateRaeder: {
        allowNull: false,
        type: Sequelize.DATE
      },
      period: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reader: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      idDeviceFlat:{
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('PeriodDeviceReaders')
  }
}
