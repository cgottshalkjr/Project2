var db = require("../models");

module.exports = function(app) {
  app.post("/favorites", function(req, res) {
    var newFavorite = {
      recipeId: req.body.recipeId,
      userId: req.user.id
    };
    db.favorite.create(newFavorite).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  app.get("/favorites", function(req, res) {
    console.log("this is the get route!!!!!!!!!!!!!!!");
    db.favorite
      .findAll({
        where: {
          userId: req.user.id
        }
      })
      .then(function(dbFavorites) {
        console.log(dbFavorites);
        var favRecipes = [];
        if (dbFavorites.length === 0) {
          var hbsObject = {
            user: req.user,
            username: req.user.username,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            image: req.user.image
          };
          res.render("favorites", hbsObject);
        }
        for (var i = 0; i < dbFavorites.length; i++) {
          db.drink
            .findAll({
              where: {
                id: dbFavorites[i].recipeId
              }
            })
            .then(function(dbDrinks) {
              console.log(dbDrinks);
              favRecipes.push(dbDrinks[0]);
              // If we've done a search for every favorite the user has saved
              if (favRecipes.length === dbFavorites.length) {
                var hbsObject = {
                  favorites: favRecipes,
                  user: req.user,
                  username: req.user.username,
                  firstname: req.user.firstname,
                  lastname: req.user.lastname,
                  image: req.user.image
                };
                console.log(hbsObject);
                res.render("favorites", hbsObject);
              }
            });
        }
      });
  });
};
