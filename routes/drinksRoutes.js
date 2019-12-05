var db = require("../models");

module.exports = function(app) {
  app.post("/addDrink", function(req, res) {
    var newDrink = {
      strDrink: req.body.strDrink,
      strIngredients: req.body.strIngredients,
      strDrinkThumb: req.body.strDrinkThumb
    };
    db.create(newDrink).then(function(data) {
      res.json(data);
    });
  });
  app.get("/api/findDrinks", function(req, res) {
    console.log(db);
    console.log(db.drink);
    db.drink
      .findAll({
        where: db.sequelize.or(
          {
            strIngredients: db.sequelize.where(
              db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
              "LIKE",
              "%" + "rum" + "%"
            )
            // {
            //   $like: "%" + "rum" + "%"
            // }
          },
          {
            strIngredients: db.sequelize.where(
              db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
              "LIKE",
              "%" + "vodka" + "%"
            )
          }
        )
      })
      .then(function(dbDrinks) {
        res.json(dbDrinks);
        console.log("Length: " + dbDrinks.length);
      });
  });
};
