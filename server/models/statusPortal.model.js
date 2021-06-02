module.exports = (sequelize, DataTypes) => {
  const StatusPortal = sequelize.define(
    'StatusPortal',
    {
      defaultDate: DataTypes.DATE
    },
    {}
  )
  StatusPortal.associate = function(models) {
    // associations can be defined here
  }
  return StatusPortal
}
