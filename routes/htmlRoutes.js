var db = require("../models");

module.exports = function(app) {
  app.get("/shelf", function(req, res) {
    db.cabinet
      .findAll({
        where: {
          userId: "1"
        }
      })
      .then(function(response) {
        console.log("this shelf response is: ******************************");
        console.log(response);
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
  app.get("/faves", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render("faves", {
      msg: "Welcome!"
    });
  });

  app.get("/", function(req, res) {
    res.render("signup");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
