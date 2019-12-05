var db = require("../models");

module.exports = function(app) {
  app.get("/shelf", function(req, res) {
    db.cabinet
      .findAll({
        where: {
          userId: req.user.id
        }
      })
      .then(function(response) {
        res.render("shelf", {
          liquors: response
        });
      });
  });
  app.get("/dashboard", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render("dashboard", {
      msg: "Welcome!"
    });
  });

  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("signup", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
