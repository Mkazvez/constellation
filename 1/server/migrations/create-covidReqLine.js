'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('covidReqLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	datePlan: {
        allowNull: false,
        type: Sequelize.DATE
      },
	idAdresTest: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idReq: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idEmplyee: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      emailRespon: {
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
    return queryInterface.dropTable('covidReqLines')
  }
}
