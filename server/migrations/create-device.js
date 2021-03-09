'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	number: {
        allowNull: false,
        type: Sequelize.STRING
      },
	idResurs: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
	idDeviceModel: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
	idMark: {
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
    return queryInterface.dropTable('Devices')
  }
}
