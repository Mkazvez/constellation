module.exports = (sequelize, DataTypes) => {
  const CovidUser = sequelize.define(
    'CovidUser',
    {
      name: DataTypes.STRING,
      surName: DataTypes.STRING,
      familia: DataTypes.STRING,
      passportSeria: DataTypes.STRING,
      passportNumber: DataTypes.STRING,
      passportDate: DataTypes.DATEONLY,
      passportWho: DataTypes.STRING,
      adres: DataTypes.STRING,
      adresFact: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      pol: DataTypes.STRING,
      dateBurn: DataTypes.DATE
    },
    {}
  )
  CovidUser.associate = function(models) {
    // associations can be defined here
  }
  return CovidUser
}
