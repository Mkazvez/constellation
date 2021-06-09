module.exports = (sequelize, DataTypes) => {
  const V_device = sequelize.define(
    'v_device',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      number: DataTypes.STRING,
      idGis: DataTypes.STRING,
      typeResursShotTitle: DataTypes.STRING,
      typeResursTitle: DataTypes.STRING,
      markShotTitle: DataTypes.STRING,
      markTitle: DataTypes.STRING,
      typeDeviceShotTitle: DataTypes.STRING,
      typeDeviceTitle: DataTypes.STRING,
      modelShotTitle: DataTypes.STRING,
      modelTitle: DataTypes.STRING,
      nameHouse: DataTypes.STRING,
      numberFlat: DataTypes.INTEGER,
      buildFlat: DataTypes.STRING,
      literaFlat: DataTypes.STRING,
      qtyresult: DataTypes.INTEGER,
      qtyfractional: DataTypes.INTEGER,
      qtymax: DataTypes.INTEGER
    },
    {}
  )
  V_device.associate = function(models) {
    // associations can be defined here
  }
  return V_device
}
