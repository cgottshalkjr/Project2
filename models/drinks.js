module.exports = function(sequelize, Sequelize) {
  var Drink = sequelize.define("drink", {
    strDrink: {
      type: Sequelize.STRING,
      allowNull: false
    },
<<<<<<< HEAD
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
=======
    strCategory: {
      type: Sequelize.TEXT,
>>>>>>> a02b2a4974e5fd905121e8f65ad0a1d8b3b8c47a
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
