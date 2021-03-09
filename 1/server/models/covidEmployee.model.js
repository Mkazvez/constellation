module.exports = (sequelize, DataTypes) => {
  const CovidEmployee = sequelize.define(
    'CovidEmployee',
    {
      tabelNumber: DataTypes.STRING,
      idAdresWork: DataTypes.INTEGER,
      idDepartment: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER
    },
    {}
  )
  CovidEmployee.associate = function(models) {
    // associations can be defined here
  }
  return CovidEmployee
}
