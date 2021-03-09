module.exports = (sequelize, DataTypes) => {
  const CovidResult = sequelize.define(
    'CovidResult',
    {
	dateResult: DataTypes.DATE,
	fioTmp: DataTypes.STRING,
	idTypeResult: DataTypes.INTEGER,
	idReqLine: DataTypes.INTEGER,
	idEmployee: DataTypes.INTEGER
    },
    {}
  )
  CovidResult.associate = function(models) {
    // associations can be defined here
  }
  return CovidResult
}
