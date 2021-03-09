'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      published: DataTypes.BOOLEAN,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      text: DataTypes.TEXT
    },
    {}
  )
  Post.associate = function(models) {
    // associations can be defined here
  }
  return Post
}
