module.exports = (sequelize, DataTypes) => {
  const DeviceMark = sequelize.define(
    'DeviceMark',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      qtyresult: DataTypes.INTEGER,
      qtyfractional: DataTypes.INTEGER,
      qtymax: DataTypes.INTEGER
    },
    {}
  )
  DeviceMark.associate = function(models) {
    // associations can be defined here
  }
  return DeviceMark
}
