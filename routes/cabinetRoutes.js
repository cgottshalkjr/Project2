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
        for(var i=0; i<dbCabinet.length; i++){
          usersCabinet.push(dbCabinet[i].ingredients);
        }
        console.log("usersCabinet is: ");
        console.log(usersCabinet);
        res.json(dbCabinet);
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
    console.log(req);
    console.log("res is: ");
    console.log(res);
    var newIngredient = {
      ingredients: "vodka"
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
