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
      .findAll({})
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

        var allIngredients = [];

        for (var i = 0; i < dbDrinks.length; i++) {
          var strIngredients = dbDrinks[i].strIngredients.split(", ");
          for (var j = 0; j < strIngredients.length; j++) {
            if (
              !allIngredients.includes(strIngredients[j]) &&
              !allIngredients.includes(strIngredients[j] + " ")
            ) {
              allIngredients.push(strIngredients[j]);
            }
          }
        }

        for (var i = 0; i < allIngredients.length; i++) {
          console.log(allIngredients[i]);
        }
        console.log("length is " + allIngredients.length);
      });
  });
};
