module.exports = function(sequelize, Sequelize) {
  var Cabinet = sequelize.define("cabinet", {
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Cabinet.associate = function(models) {
    Cabinet.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Cabinet;
};
