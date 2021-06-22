module.exports = (sequelize, DataTypes) => {
  const v_document = sequelize.define(
    'v_document',
    {
      titledocument: DataTypes.STRING,
      period: DataTypes.DATE,
      typedocument: DataTypes.STRING,
      idAccount: DataTypes.INTEGER,
      iduser: DataTypes.INTEGER,
      url: DataTypes.STRING,
      nameFlat: DataTypes.STRING,
      period_month: DataTypes.STRING,
      idFlat: DataTypes.INTEGER
    },
    {}
  )
  v_document.associate = function(models) {
    // associations can be defined here
  }
  return v_document
}
