module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    'Region',
    {
      title: DataTypes.STRING,
      fias: DataTypes.STRING
    },
    {}
  )
  Region.associate = function(models) {
    // associations can be defined here
  }
  return Region
}
