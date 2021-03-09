module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      active: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmEmail: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      firstName: DataTypes.STRING,
      patronymicName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
