module.exports = (sequelize, DataTypes) => {
  const DeviceModel = sequelize.define(
    'DeviceModel',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  DeviceModel.associate = function(models) {
    // associations can be defined here
  }
  return DeviceModel
}
