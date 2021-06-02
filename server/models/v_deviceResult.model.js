module.exports = (sequelize, DataTypes) => {
  const V_deviceresult = sequelize.define(
    'v_deviceResult',
    {
      titleDeviceResult: DataTypes.STRING,
      numberDevice: DataTypes.STRING,
      period: DataTypes.DATE,
      period_month: DataTypes.STRING,
      result: DataTypes.FLOAT,
      lperiod: DataTypes.DATE,
      lperiod_month: DataTypes.STRING,
      lresult: DataTypes.FLOAT,
      typeResursShotTitle: DataTypes.STRING,
      typeDeviceShotTitle: DataTypes.STRING,
      idFlat: DataTypes.INTEGER,
      nameFlat: DataTypes.STRING,
      userFullName: DataTypes.INTEGER,
      email: DataTypes.STRING,
      idAccountUser: DataTypes.INTEGER
    },
    {}
  )
  V_deviceresult.associate = function(models) {
    // associations can be defined here
  }
  return V_deviceresult
}
