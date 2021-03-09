module.exports = (sequelize, DataTypes) => {
  const DeviceMark = sequelize.define(
    'DeviceMark',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  DeviceMark.associate = function(models) {
    // associations can be defined here
  }
  return DeviceMark
}
