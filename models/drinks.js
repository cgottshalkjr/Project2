module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("drink", {
    name: {
      type: DataTypes.STRING,
      allowNull: False
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: False
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: False
    },
    picture: {
      type: DataTypes.STRING
    }
  });

  return Drink;
};
