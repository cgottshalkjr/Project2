var db = require("../models");

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.dashboard = function(req, res) {
  if (req.user) {
    db.user
      .findOne({
        where: {
          id: req.user.id
        }
      })
      .then(function(dbUser) {
        var hbsObject = {
          user: req.user,
          username: dbUser.username,
          firstname: dbUser.firstname,
          lastname: dbUser.latename
        };
        res.render("dashboard", hbsObject);
      });
  }
};

exports.shelf = function(req, res) {
  res.render("shelf");
};

exports.logout = function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/signin");
  });
};
