module.exports = (sequelize, DataTypes) => {
  const DeviceResult = sequelize.define(
    'DeviceResult',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      idDevice: DataTypes.INTEGER,
      period: DataTypes.DATE,
      result: DataTypes.FLOAT,
      idUser: DataTypes.INTEGER
    },
    {}
  )
  DeviceResult.associate = function(models) {
    // associations can be defined here
  }
  return DeviceResult
}
