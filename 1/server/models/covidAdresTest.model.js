module.exports = (sequelize, DataTypes) => {
  const CovidAdresTest = sequelize.define(
    'CovidAdresTest',
    {
      title: DataTypes.STRING,
      adres: DataTypes.STRING		
    },
    {}
  )
  CovidAdresTest.associate = function(models) {
    // associations can be defined here
  }
  return CovidAdresTest
}
