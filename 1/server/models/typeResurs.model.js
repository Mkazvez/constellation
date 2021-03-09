module.exports = (sequelize, DataTypes) => {
  const TypeResurs = sequelize.define(
    'TypeResurs',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  TypeResurs.associate = function(models) {
    // associations can be defined here
  }
  return TypeResurs
}
