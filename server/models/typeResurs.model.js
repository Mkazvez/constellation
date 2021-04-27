module.exports = (sequelize, DataTypes) => {
  const Typeresurs = sequelize.define(
    'Typeresurs',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  Typeresurs.associate = function(models) {
    // associations can be defined here
  }
  return Typeresurs
}
