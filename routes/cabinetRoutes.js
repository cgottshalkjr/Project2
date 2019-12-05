var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    console.log(db.cabinet);
    console.log("Hello!");
    db.cabinet.findAll({}).then(function(dbCabinet) {
      res.json(dbCabinet);
    });
  });

  app.get("/api/myIngredients", function(req, res) {
    console.log(db.cabinet);
    console.log("Hello!");
    db.cabinet
      .findAll({
        where: {
          userId: "1"
        }
      })
      .then(function(dbCabinet) {
        var usersCabinet = [];
        for (var i = 0; i < dbCabinet.length; i++) {
          usersCabinet.push(dbCabinet[i].ingredients);
        }
        console.log("usersCabinet is: ");
        console.log(usersCabinet);
        db.drink
          //Return all the drinks that contain the first ingredient in the user's cabinet
          .findAll({
            where: {
              strIngredients: db.sequelize.where(
                db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
                "LIKE",
                "%" + usersCabinet[0] + "%"
              )
            }
          })
          .then(function(dbDrinks) {
            var recipeIngredients = [];
            console.log(dbDrinks.length);
            //For each drink receipe returned from the drinks table, make an array of its ingredients:
            for (var i = 0; i < dbDrinks.length; i++) {
              console.log(dbDrinks[i].strIngredients);
              recipeIngredients[i] = dbDrinks[i].strIngredients
                .trim()
                .toLowerCase()
                .split(", ");
              //Adds the drink ID to the end of the array of ingredients
              recipeIngredients[i].push(dbDrinks[i].id);
            }

            var resultsArray = [];

            for (var i = 0; i < recipeIngredients.length; i++) {
              var cocktail = recipeIngredients[i];
              //    if(cocktail.length===3){
              //      for(var k=0; k<cocktail.length; k++){
              if (
                usersCabinet.includes(cocktail[0]) &&
                usersCabinet.includes(cocktail[1])
              ) {
                resultsArray.push(cocktail);
              }

              console.log("resultsArray is ");
              console.log(resultsArray);

              for (var j = 0; j < recipeIngredients[i].length; j++) {
                console.log("cocktail[" + j + "] is: ");
                console.log(cocktail[j]);
              }
            }

            console.log("resultsArray is ");
            console.log(resultsArray);

            console.log("usersCabinet is ");
            console.log(usersCabinet);

            console.log("recipeIngredients is: ");
            console.log(recipeIngredients);
            res.json(dbDrinks);
          });
      });
  });

  app.post("/api/addIngredient", function(req, res) {
    console.log("It ran! req is: ");
    console.log(req);
    console.log("res is: ");
    console.log(res);
    var newIngredient = {
      ingredients: req.ingredients,
      userId: req.user.id
    };
    db.cabinet.create(newIngredient).then(function(data) {
      res.json(data);
    });
  });
};
