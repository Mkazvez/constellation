module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      idUser: DataTypes.INTEGER,
      idAccount: DataTypes.INTEGER,
      confirm: DataTypes.BOOLEAN
    },
    {}
  )
  Account.associate = function(models) {
    // associations can be defined here
  }
  return Account
}
