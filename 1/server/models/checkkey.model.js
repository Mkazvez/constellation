'use strict'
module.exports = (sequelize, DataTypes) => {
  const CheckKey = sequelize.define(
    'CheckKey',
    {
      email: DataTypes.STRING,
      key: DataTypes.STRING
    },
    {}
  )
  CheckKey.associate = function(models) {
    // associations can be defined here
  }
  return CheckKey
}
