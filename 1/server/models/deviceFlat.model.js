module.exports = (sequelize, DataTypes) => {
  const DeviceFlat = sequelize.define(
    'DeviceFlat',
    {
      idFlat: DataTypes.INTEGER,
      idDevice: DataTypes.INTEGER
    },
    {}
  )
  DeviceFlat.associate = function(models) {
    // associations can be defined here
  }
  return DeviceFlat
}
