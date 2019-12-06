module.exports = function(sequelize, Sequelize) {
  var Cabinet = sequelize.define("cabinet", {
    ingredients: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  // Cabinet.associate = function(models) {
  //   Cabinet.belongsTo(models.User, {
  //     foreignKey: "id"
  //   });
  // };
  return Cabinet;
};
