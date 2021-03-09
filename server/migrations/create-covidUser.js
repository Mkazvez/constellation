'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('covidUsers', {
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
      passportSeria: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passportNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passportDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      passportWho: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adres: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresFact: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateBurn: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('covidUsers')
  }
}
