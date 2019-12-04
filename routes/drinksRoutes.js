var db = require("../models");

module.exports = function(app) {
  app.post("/addDrink", function(req, res) {
    var newDrink = {
      name: req.body.name,
      
      stringredient: req.body.stringredients,
      stringredients: req.body.stringredients,
      stringredients: req.body.stringredients,
      stringredients: req.body.stringredients,
      stringredients: req.body.stringredients,
      stringredients: req.body.stringredients,
      stringredients: req.body.stringredients,


      instructions: req.body.intructions,
      picture: req.body.picture
    };
    db.create(newDrink).then(function(data) {
      res.json(data);
    });
  });
};
