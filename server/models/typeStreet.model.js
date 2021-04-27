module.exports = (sequelize, DataTypes) => {
  const TypeStreet = sequelize.define(
    'typeStreet',
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
