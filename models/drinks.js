module.exports = function(sequelize, Sequelize) {
  var Drink = sequelize.define("drink", {
    strDrink: {
      type: Sequelize.STRING,
      allowNull: false
    },
    strIngredient1: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    strIngredient2: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    strIngredient3: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient4: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient5: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient6: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient7: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient8: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strIngredient9: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    strInstructions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    strDrinkThumb: {
      type: Sequelize.STRING
    }
  });
  return Drink;
};
