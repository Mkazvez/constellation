module.exports = (sequelize, DataTypes) => {
  const Typedevice = sequelize.define(
    'Typedevice',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  Typedevice.associate = function(models) {
    // associations can be defined here
  }
  return Typedevice
}
