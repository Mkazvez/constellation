module.exports = (sequelize, DataTypes) => {
  const V_House = sequelize.define(
    'V_House',
    {
      shotTypeStreet: DataTypes.STRING,
      titleStreet: DataTypes.STRING,
      title: DataTypes.STRING,
      number: DataTypes.INTEGER,
      build: DataTypes.STRING,
      litera: DataTypes.STRING
    },
    {}
  )
  V_House.associate = function(models) {
    // associations can be defined here
  }
  return V_House
}
