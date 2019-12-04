CREATE DATABASE cocktailsdb;
USE cocktailsdb;

CREATE TABLE drinks
(
	id int NOT NULL AUTO_INCREMENT,
	strDrink varchar(255) NOT NULL,
    strCategory varchar(255) NOT NULL,
	strDrinkThumb varchar(255) NOT NULL,
    strIngredient1 varchar(255) NOT NULL,
    strIngredient2 varchar(255) NOT NULL,
    strIngredient3 varchar(255) NOT NULL,
    strIngredient4 varchar(255) NOT NULL,
    strIngredient5 varchar(255) NOT NULL,
    strIngredient6 varchar(255) NOT NULL,
    strIngredient7 varchar(255) NOT NULL,
    strIngredient8 varchar(255) NOT NULL,
    strIngredient9 varchar(255) NOT NULL,
    strInstructions varchar(1000) NOT NULL,
	PRIMARY KEY (id)
);



SELECT * FROM cocktailsdb.drinks;

SELECT 
	strDrink
    
FROM drinks

WHERE
	strIngredient1 IN ('vodka'); 

SELECT strDrink
FROM drinks
WHERE strIngredient1||strIngredient2||strIngredient3||strIngredient4
||strIngredient5||strIngredient6||strIngredient7||strIngredient8||strIngredient9 like '%vodka%'

