module.exports = (sequelize, DataTypes) => {
  const V_Accountuser = sequelize.define(
    'V_Accountuser',
    {
      idUser: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      patronymicName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      idAccountFull: DataTypes.INTEGER,
      idAccount: DataTypes.INTEGER,
      nameFlat: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  )
  V_Accountuser.associate = function(models) {
    // associations can be defined here
  }
  return V_Accountuser
}
