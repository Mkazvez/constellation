module.exports = (sequelize, DataTypes) => {
  const CovidReq = sequelize.define(
    'CovidReq',
    {
      datePlan: DataTypes.DATE,
      idAdresTest: DataTypes.INTEGER
    },
    {}
  )
  CovidReq.associate = function(models) {
    // associations can be defined here
  }
  return CovidReq
}
