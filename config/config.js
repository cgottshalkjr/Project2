require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQLPASS,
    database: "cocktailsdb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};


//process.env.MYSQL_PASSWORD