module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'Document',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      idTypeDocument: DataTypes.INTEGER,
      idAccount: DataTypes.INTEGER,
      period: DataTypes.DATE,
      url: DataTypes.STRING
    },
    {}
  )
  Document.associate = function(models) {
    // associations can be defined here
  }
  return Document
}
