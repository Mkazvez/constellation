module.exports = (sequelize, DataTypes) => {
  const CovidAdresWork = sequelize.define(
    'CovidAdresWork',
    {
      title: DataTypes.STRING,
      adres: DataTypes.STRING		
    },
    {}
  )
  CovidAdresWork.associate = function(models) {
    // associations can be defined here
  }
  return CovidAdresWork
}
