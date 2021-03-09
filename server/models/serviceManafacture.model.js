module.exports = (sequelize, DataTypes) => {
  const ServiceManafacture = sequelize.define(
    'ServiceManafacture',
    {
      shottitle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      adres: DataTypes.STRING,
      email: DataTypes.STRING,	
      url: DataTypes.STRING,
      urlAdmin: DataTypes.STRING
    },
    {}
  )
  ServiceManafacture.associate = function(models) {
    // associations can be defined here
  }
  return ServiceManafacture
}
