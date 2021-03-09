module.exports = (sequelize, DataTypes) => {
  const TypeDevice = sequelize.define(
    'TypeDevice',
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
