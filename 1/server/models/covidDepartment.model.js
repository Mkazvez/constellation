module.exports = (sequelize, DataTypes) => {
  const CovidDepartment = sequelize.define(
    'CovidDepartment',
    {
      title: DataTypes.STRING,
      adres: DataTypes.STRING		
    },
    {}
  )
  CovidDepartment.associate = function(models) {
    // associations can be defined here
  }
  return CovidDepartment
}
