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

  app.get("/", function(req, res) {
    res.render("signup");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
