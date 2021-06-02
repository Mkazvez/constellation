module.exports = (sequelize, DataTypes) => {
  const Typedocument = sequelize.define(
    'Typedocument',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  Typedocument.associate = function(models) {
    // associations can be defined here
  }
  return Typedocument
}
