var db = require("../models");

module.exports = function(app) {
  app.post("/addDrink", function(req, res) {
    var newDrink = {
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.intructions,
      picture: req.body.picture
    };
    db.create(newDrink).then(function(data) {
      res.json(data);
    });
  });
};
