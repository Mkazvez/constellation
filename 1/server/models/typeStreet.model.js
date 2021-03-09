module.exports = (sequelize, DataTypes) => {
  const TypeStreet = sequelize.define(
    'TypeStreet',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  TypeStreet.associate = function(models) {
    // associations can be defined here
  }
  return TypeStreet
}
