module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Flat',
    {
      idUser: DataTypes.INTEGER,
      idAccount: DataTypes.INTEGER
    },
    {}
  )
  Account.associate = function(models) {
    // associations can be defined here
  }
  return Account
}
