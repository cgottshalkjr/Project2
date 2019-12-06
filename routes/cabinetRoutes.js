var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    console.log(db.cabinet);
    console.log("Hello!");
    db.cabinet.findAll({}).then(function(dbCabinet) {
      res.json(dbCabinet);
    });
  });

  app.get("/api/myDrinks", function(req, res) {
    var userId = 2;
    console.log(db.cabinet);
    db.cabinet
      .findAll({
        where: {
          userId: userId
        }
      })
      .then(function(dbCabinet) {
        var usersCabinet = [];
        for (var i = 0; i < dbCabinet.length; i++) {
          usersCabinet.push(dbCabinet[i].ingredients.toLowerCase());
        }
        console.log("usersCabinet is: ");
        console.log(usersCabinet);
        db.drink
        //Return all the drinks that contain the first ingredient in the user's cabinet
        // .findAll({
        //   where: {
        //     strIngredients: db.sequelize.where(
        //       db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
        //       "LIKE",
        //       "%" + usersCabinet[0] + "%"
        //     )
        //   }
        // })

          //Finds and returns all the drinks that contain one of the user's first three ingredients in their cabinet
          // .findAll({
          //   where: db.sequelize.or(
          //     {
          //       strIngredients: db.sequelize.where(
          //         db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
          //         "LIKE",
          //         "%" + usersCabinet[0] + "%"
          //       )
          //     },
          //     {
          //       strIngredients: db.sequelize.where(
          //         db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
          //         "LIKE",
          //         "%" + usersCabinet[1] + "%"
          //       )
          //     },
          //     {
          //       strIngredients: db.sequelize.where(
          //         db.sequelize.fn("LOWER", db.sequelize.col("strIngredients")),
          //         "LIKE",
          //         "%" + usersCabinet[2] + "%"
          //       )
          //     }
          //   )
          // })
          .findAll({})
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
              //Adds the id of the cocktail (from the "drinks" table) to the end of the array of ingredients
              recipeIngredients[i].push(dbDrinks[i].id);
            }

            //The variable resultsArray are the results we will ultimately give to the user
            var resultsArray = [];

            for (var i = 0; i < recipeIngredients.length; i++) {
              var cocktail = recipeIngredients[i];

              //Most recipes say "light rum", "dark rum", or "white rum", which causes our .includes a few lines down to return false, so here we're ensuring that if "rum" is in "userCabinet", drinks with light, dark, or white rum will also be returned
              for (var k = 0; k < cocktail.length; k++) {
                if (
                  cocktail[k] === "light rum" &&
                  !usersCabinet.includes("light rum")
                ) {
                  cocktail[k] = "rum";
                } else if (
                  cocktail[k] === "dark rum" &&
                  !usersCabinet.includes("dark rum")
                ) {
                  cocktail[k] = "rum";
                } else if (
                  cocktail[k] === "white rum" &&
                  !usersCabinet.includes("white rum")
                ) {
                  cocktail[k] = "rum";
                }
              }

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
                for (var j = 0; j < cocktail.length - 1; j++) {
                  if (usersCabinet.includes(cocktail[j])) {
                    howManyMatches++;
                  }
                }
                //If you ever want to only return drinks for which the user has ALL the ingredients, change the below line to "if (howManyMatches === (cocktail.length - 1))"
                if (howManyMatches > 4) {
                  resultsArray.push(cocktail);
                }
              }
            }

            console.log("resultsArray is ");
            console.log(resultsArray);

            //Creates an array of resultsIds and puts the last element of each drink stored in resultsArray-- that is, the id of that cocktail in the "drinks" table-- into it.
            //In other words, "resultsId" will contain the id of every drink that was a match!
            var resultsIds = [];
            for (var i = 0; i < resultsArray.length; i++) {
              resultsIds[i] = resultsArray[i].pop();
            }
            console.log("resultsIds is ");
            console.log(resultsIds);

            //Sends a query to return all the drinks whose ID is contained in resultsIds
            db.drink
              .findAll({
                where: {
                  id: resultsIds
                }
              })
              .then(function(results) {
                res.json(results);
              });

            console.log("usersCabinet is ");
            console.log(usersCabinet);
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

  app.post("/api/addIngredient", function(req, res) {
    console.log("It ran! req is: ");
    console.log(req.body);
    console.log("res is: ");
    // console.log(res);
    var newIngredient = {
      ingredients: req.body.ingredients,
      userId: 1
    };
    db.cabinet.create(newIngredient).then(function(data) {
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
