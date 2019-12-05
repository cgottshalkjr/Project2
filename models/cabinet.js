module.exports = function (sequelize, Sequelize) {
  var Cabinet = sequelize.define("cabinet", {
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
    }
  });

  Cabinet.associate = function (models) {
    Cabinet.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Cabinet;
};
