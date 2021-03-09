'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('covidResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	dateResult: {
        allowNull: false,
        type: Sequelize.DATE
      },
	fioTmp: {
        allowNull: false,
        type: Sequelize.STRING
      },
	idTypeResult: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
	idReqLine: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
	idEmployee: {
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
    return queryInterface.dropTable('covidResults')
  }
}
