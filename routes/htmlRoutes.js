var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/shelf", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render("shelf", {
      msg: "Welcome!"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
