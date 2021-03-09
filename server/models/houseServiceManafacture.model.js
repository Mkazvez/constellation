module.exports = (sequelize, DataTypes) => {
  const HouseServiceManafacture = sequelize.define(
    'HouseServiceManafacture',
    {
      idHouse: DataTypes.INTEGER,
      idServiceManafacture: DataTypes.INTEGER
    },
    {}
  )
  HouseServiceManafacture.associate = function(models) {
    // associations can be defined here
  }
  return HouseServiceManafacture
}
