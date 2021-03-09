module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      idStreet: DataTypes.INTEGER,
      title: DataTypes.STRING,
      number: DataTypes.INTEGER,
      build: DataTypes.STRING,
      litera: DataTypes.STRING
    },
    {}
  )
  House.associate = function(models) {
    // associations can be defined here
  }
  return House
}
