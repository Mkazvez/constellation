module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define(
    'Flat',
    {
      idHouse: DataTypes.INTEGER,
      number: DataTypes.INTEGER,
      build: DataTypes.STRING,
      litera: DataTypes.STRING
    },
    {}
  )
  Flat.associate = function(models) {
    // associations can be defined here
  }
  return Flat
}
