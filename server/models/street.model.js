module.exports = (sequelize, DataTypes) => {
  const Street = sequelize.define(
    'Street',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      idTypeStreet: DataTypes.INTEGER,
      idRegion: DataTypes.INTEGER
    },
    {}
  )
  Street.associate = function(models) {
    // associations can be defined here
  }
  return Street
}
