'use strict'
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      sid: DataTypes.STRING(36),
      expires: DataTypes.DATE,
      data: DataTypes.TEXT
    },
    { freezeTableName: true }
  )
  Session.associate = function(models) {
    // associations can be defined here
  }
  return Session
}
