module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    'Device',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      number: DataTypes.STRING,
      idResurs: DataTypes.INTEGER,
      idDeviceModel: DataTypes.INTEGER,
      idMark: DataTypes.INTEGER,
      idGis: DataTypes.STRING,
      idTypeDevice: DataTypes.INTEGER,
      idFlat: DataTypes.INTEGER
    },
    {}
  )
  Device.associate = function(models) {
    // associations can be defined here
  }
  return Device
}
