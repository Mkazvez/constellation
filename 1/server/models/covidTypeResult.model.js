module.exports = (sequelize, DataTypes) => {
  const CovidTypeResult = sequelize.define(
    'CovidTypeResult',
    {
      title: DataTypes.STRING
    },
    {}
  )
  CovidTypeResult.associate = function(models) {
    // associations can be defined here
  }
  return CovidTypeResult
}
