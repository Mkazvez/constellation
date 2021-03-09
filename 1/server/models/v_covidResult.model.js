module.exports = (sequelize, DataTypes) => {
  const V_CovidResult = sequelize.define(
    'V_CovidResult',
    {
      dateResult: DataTypes.DATE,
      fioTmp: DataTypes.STRING, 
      titleTypeResult: DataTypes.STRING, 
      Familia: DataTypes.STRING, 
      name: DataTypes.STRING, 
      surName: DataTypes.STRING, 
      pol: DataTypes.STRING, 
      dateBurn: DataTypes.DATE,
      datePlan: DataTypes.DATE,
    },
    {}
  )
  V_CovidResult.associate = function(models) {
    // associations can be defined here
  }
  return V_CovidResult
}
