module.exports = function(sequelize, Sequelize) {
  var Drink = sequelize.define("drink", {
    strDrink: {
      type: Sequelize.STRING,
      allowNull: false
    },
    strCategory: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strDrinkThumb: {
      type: Sequelize.STRING
    },
    strIngredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    strInstructions: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });
  return Drink;
};
