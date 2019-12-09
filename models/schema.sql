CREATE DATABASE cocktailsdb;
USE cocktailsdb;




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



