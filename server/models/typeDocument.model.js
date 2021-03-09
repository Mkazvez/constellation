module.exports = (sequelize, DataTypes) => {
  const TypeDocument = sequelize.define(
    'TypeDocument',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  TypeDocument.associate = function(models) {
    // associations can be defined here
  }
  return TypeDocument
}
