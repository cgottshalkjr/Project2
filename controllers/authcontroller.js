var db = require("../models");

exports.signup = function (req, res) {
  res.render("signup");
};

exports.signin = function (req, res) {
  res.render("signin");
};

exports.dashboard = function (req, res) {
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
          username: dbUser.username,
          firstname: dbUser.firstname,
          lastname: dbUser.lastname,
          image: dbUser.image
        };
        res.render("dashboard", hbsObject);
      });
  }
};

exports.favorites = function (req, res) {
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
          username: dbUser.username,
          firstname: dbUser.firstname,
          lastname: dbUser.lastname,
          image: dbUser.image
        };
        res.render("favorites", hbsObject);
      });
  }
};

exports.shelf = function (req, res) {
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
          username: dbUser.username,
          firstname: dbUser.firstname,
          lastname: dbUser.lastname,
          image: dbUser.image
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
};

exports.logout = function (req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
};
