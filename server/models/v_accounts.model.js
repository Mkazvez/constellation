module.exports = (sequelize, DataTypes) => {
  const V_accounts = sequelize.define(
    'v_accounts',
    {
      nameFlat: DataTypes.STRING,
      idAccount: DataTypes.INTEGER,
      procent: DataTypes.FLOAT,
      sq: DataTypes.FLOAT
    },
    {}
  )
  V_accounts.associate = function(models) {
    // associations can be defined here
  }
  return V_accounts
}
