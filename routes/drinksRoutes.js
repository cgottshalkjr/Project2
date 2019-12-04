var db = require("../models");

module.exports = function (app) {
  app.post("/addDrink", function (req, res) {
    var newDrink = {
      strDrink: req.body.strDrink,
      strIngredient1: req.body.strIngredient1,
      strIngredient2: req.body.strIngredient2,
      strIngredient3: req.body.strIngredient3,
      strIngredient4: req.body.strIngredient4,
      strIngredient5: req.body.strIngredient5,
      strIngredient6: req.body.strIngredient6,
      strIngredient7: req.body.strIngredient7,
      strIngredient8: req.body.strIngredient8,
      strIngredient9: req.body.strIngredient9,
      strInstructions: req.body.strIntructions,
      strDrinkThumb: req.body.strDrinkThumb
    };
    db.create(newDrink).then(function (data) {
      res.json(data);
    });
  });
  app.get("/findDrinks", function (req, res) {
    console.log(db);
    console.log(db.drink);
    db.drink
      .findAll({
        where: {
          strIngredient1: db.sequelize.where(
            db.sequelize.fn("LOWER", db.sequelize.col("strIngredient1")),
            "LIKE",
            "%" + "rum" + "%"
          )
          // {
          //   $like: "%" + "rum" + "%"
          // }
        }
      })
      .then(function(dbDrinks) {
        res.json(dbDrinks);
      });
  });
};
