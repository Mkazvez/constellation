module.exports = (sequelize, DataTypes) => {
  const CovidReqLine = sequelize.define(
    'CovidReqLine',
    {
      datePlan: DataTypes.DATE,
      idAdresTest: DataTypes.INTEGER,
      idReq: DataTypes.INTEGER,
      idEmplyee: DataTypes.INTEGER,
      emailRespon: DataTypes.STRING
    },
    {}
  )
  CovidReqLine.associate = function(models) {
    // associations can be defined here
  }
  return CovidReqLine
}
