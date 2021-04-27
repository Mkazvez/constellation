module.exports = (sequelize, DataTypes) => {
  const TypeDevice = sequelize.define(
    'Typedevice',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  TypeDevice.associate = function(models) {
    // associations can be defined here
  }
  return TypeDevice
}
