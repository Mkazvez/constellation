module.exports = (sequelize, DataTypes) => {
  const V_street = sequelize.define(
    'v_street',
    {
      title: DataTypes.STRING,
      shotTypeStreet: DataTypes.STRING, 
      shotNameTypeStreet: DataTypes.STRING, 
      NameTypeStreet: DataTypes.STRING, 
      NameRegion: DataTypes.STRING,
      Description: DataTypes.STRING
    },
    {}
  )
  V_street.associate = function(models) {
    // associations can be defined here
  }
  return V_street
}
