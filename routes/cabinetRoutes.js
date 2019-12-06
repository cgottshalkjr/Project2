var db = require("../models");

module.exports = function (app) {
  app.get("/api/ingredients", function (req, res) {
    console.log(db.cabinet);
    console.log("Hello!");
    db.cabinet.findAll({}).then(function (dbCabinet) {
      res.json(dbCabinet);
    });
  });

  app.get("/api/myIngredients", function (req, res) {
    console.log(db.cabinet);
    console.log("Hello!");
    db.cabinet
      .findAll({
        where: {
          userId: "1"
        }
      })
      .then(function (dbCabinet) {
        var usersCabinet = [];
        for (var i = 0; i < dbCabinet.length; i++) {
          usersCabinet.push(dbCabinet[i].ingredients.toLowerCase());
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
          .then(function (dbDrinks) {
            var recipeIngredients = [];
            console.log(dbDrinks.length);
            //For each drink receipe returned from the drinks table, make an array of its ingredients:
            for (var i = 0; i < dbDrinks.length; i++) {
              console.log(dbDrinks[i].strIngredients);
              recipeIngredients[i] = dbDrinks[i].strIngredients.trim().toLowerCase().split(", ");
              //Adds the drink ID to the end of the array of ingredients
              recipeIngredients[i].push(dbDrinks[i].id);
            }

            //The variable resultsArray are the results we will ultimately give to the user
            var resultsArray = [];

            for (var i = 0; i < recipeIngredients.length; i++) {
              var cocktail = recipeIngredients[i];

              //if there are only 2 ingredients in the cocktail, both of them must be in the user's cabinet in order for the drink to be returned.
              if (cocktail.length === 3) {
                //      for(var k=0; k<cocktail.length; k++){
                if (
                  usersCabinet.includes(cocktail[0]) &&
                  usersCabinet.includes(cocktail[1])
                ) {
                  resultsArray.push(cocktail);
                }
              }
              //if there are 3 ingredients in the cocktail, all of them must be in the user's cabinet in order for the drink to be returned
              else if (cocktail.length === 4) {
                if (
                  usersCabinet.includes(cocktail[0]) &&
                  usersCabinet.includes(cocktail[1]) &&
                  usersCabinet.includes(cocktail[2])
                ) {
                  resultsArray.push(cocktail);
                }
              }
              //If there are 4 or more ingredients in the cocktail, the user must have at least 4 of the ingredients in their cabinet for the cocktail to be returned.
              else if (cocktail.length > 4) {
                var howManyMatches = 0;
                for (var j = 0; j < (cocktail.length - 1); j++) {
                  if (usersCabinet.includes(cocktail[j])) {
                    howManyMatches++;
                  }
                }
                if (howManyMatches > 4) {
                  resultsArray.push(cocktail);
                }
              }

              // }
              //   }

              //   console.log("resultsArray is ");
              //   console.log(resultsArray);

              for (var j = 0; j < recipeIngredients[i].length; j++) {
                //    console.log("cocktail[" + j + "] is: ");
                //   console.log(cocktail[j]);
              }
            }

            console.log("resultsArray is ");
            console.log(resultsArray);

            console.log("usersCabinet is ");
            console.log(usersCabinet);




            //    console.log("recipeIngredients is: ");
            //     console.log(recipeIngredients);
            res.json(resultsArray);
          });
      });
  });

  // app.get("/api/addIngredient", function(req, res) {
  //   console.log(db);
  //   console.log(db.cabinet);
  //   db.cabinet.findAll({}).then(function(dbCabinet) {
  //     res.json(dbCabinet);
  //   });
  // });

  app.post("/api/addIngredient", function (req, res) {
    console.log("It ran! req is: ");
    console.log(req);
    console.log("res is: ");
    console.log(res);
    var newIngredient = {
      ingredients: "vodka"
    };
    db.cabinet.create(newIngredient).then(function (data) {
      res.json(data);
    });
    // var newIngredient = {

    // }
    // db.cabinet.create("vodka").then(function(dbCabinet) {
    //   console.log("It ran!");
    //   res.json(dbCabinet);
    // });
  });
};
