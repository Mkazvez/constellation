module.exports = (sequelize, DataTypes) => {
  const V_Accountuser = sequelize.define(
    'v_accountusers',
    {
      idUser: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      patronymicName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      idAccountFull: DataTypes.INTEGER,
      idAccount: DataTypes.INTEGER,
      nameFlat: DataTypes.STRING,
      email: DataTypes.STRING,
      idFlat: DataTypes.INTEGER
    },
    {}
  )
  V_Accountuser.associate = function(models) {
    // associations can be defined here
  }
  return V_Accountuser
}
