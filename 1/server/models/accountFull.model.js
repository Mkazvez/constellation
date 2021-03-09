module.exports = (sequelize, DataTypes) => {
  const AccountFull = sequelize.define(
    'AccountFull',
    {
      idAccount: DataTypes.INTEGER,
      idFlat: DataTypes.INTEGER,
      procent: DataTypes.FLOAT,
      sq: DataTypes.FLOAT
    },
    {}
  )
  AccountFull.associate = function(models) {
    // associations can be defined here
  }
  return AccountFull
}
