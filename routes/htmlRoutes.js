var db = require("../models");

module.exports = function(app) {
  app.get("/shelf", function(req, res) {
    if (req.user) {
      db.user
        .findOne({
          where: {
            id: req.user.id
          }
        })
        .then(function (dbUser) {
          var hbsObject = {
            user: req.user,
            username: req.user.username,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            image: req.user.image
          };
          db.cabinet
            .findAll({
              where: {
                userId: req.user.id
              }
            })
            .then(function (response) {
              console.log("+++++++++++++++++++++++++");
              // console.log(response);
              hbsObject.cabinet = new Set(response.map(item => item.dataValues.ingredients));
              console.log(hbsObject.cabinet);
  
              res.render("shelf", hbsObject);
            });
        });
    }
  });
  app.get("/dashboard", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
    res.render("dashboard", {
      msg: "Welcome!"
    });
  });
  // app.get("/favorites", function(req, res) {
  //   //db.Example.findAll({}).then(function(dbExamples) {
  //   res.render("favorites", {
  //     msg: "Welcome!"
  //   });
  // });

  app.get("/", function(req, res) {
    res.render("signup");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
