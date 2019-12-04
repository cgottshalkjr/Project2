module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("drink", {
    strDrink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    strIngredient1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    strIngredient2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    strIngredient3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient5: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient6: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient7: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient8: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strIngredient9: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    strInstructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    strDrinkThumb: {
      type: DataTypes.STRING
    }
  });

  return Drink;
};
