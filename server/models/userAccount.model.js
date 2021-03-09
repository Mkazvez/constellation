module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define(
    'UserAccount',
    {
      name: DataTypes.STRING,
      surName: DataTypes.STRING,
      familia: DataTypes.STRING,
      idFlat: DataTypes.INTEGER,
      blocked: DataTypes.BOOLEAN,
      dateBlocked: DataTypes.STRING
    },
    {}
  )
  UserAccount.associate = function(models) {
    // associations can be defined here
  }
  return UserAccount
}
