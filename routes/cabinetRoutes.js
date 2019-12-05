var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    console.log(db);
    console.log(db.cabinet);
    db.cabinet.findAll({}).then(function(dbCabinet) {
      res.json(dbCabinet);
    });
  });

  //   app.post("/api/addIngredient", function(req, res) {
  //     //Code here
  //   });
};
