module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("drink", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING
    }
  });

  return Drink;
};
