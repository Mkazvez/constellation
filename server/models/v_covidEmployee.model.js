module.exports = (sequelize, DataTypes) => {
  const V_CovidEmployee = sequelize.define(
    'V_CovidEmployee',
    {
      tabelNumber: DataTypes.STRING,
      titleDepartment: DataTypes.STRING, 
      adresWork: DataTypes.STRING, 
      Familia: DataTypes.STRING, 
      name: DataTypes.STRING, 
      surName: DataTypes.STRING, 
      pol: DataTypes.STRING, 
      dateBurn: DataTypes.DATE
    },
    {}
  )
  V_CovidEmployee.associate = function(models) {
    // associations can be defined here
  }
  return V_CovidEmployee
}
