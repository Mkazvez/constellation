module.exports = (sequelize, DataTypes) => {
  const V_Flat = sequelize.define(
    'V_Flat',
    {
	nameHouse: DataTypes.STRING,
	idHouse: DataTypes.INTEGER,
      	number: DataTypes.INTEGER,
      	build: DataTypes.STRING,
      	litera: DataTypes.STRING
    },
    {}
  )
  V_Flat.associate = function(models) {
    // associations can be defined here
  }
  return V_Flat
}
