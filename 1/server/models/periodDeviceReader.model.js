module.exports = (sequelize, DataTypes) => {
  const PeriodDeviceReader = sequelize.define(
    'PeriodDeviceReader',
    {
      dateReader: DataTypes.DATE,
      period: DataTypes.DATE,
      reader: DataTypes.FLOAT,
      idDeviceFlat: DataTypes.INTEGER
    },
    {}
  )
  PeriodDeviceReader.associate = function(models) {
    // associations can be defined here
  }
  return PeriodDeviceReader
}
