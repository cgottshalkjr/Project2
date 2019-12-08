module.exports = function(sequelize, Sequelize) {
  var Favorite = sequelize.define("favorite", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Favorite;
};
