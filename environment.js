let dbHost;
let dbName;
let dbPort;
let dbConnections;
let dbUser;
let dbPassword;

dbHost = "xana";
dbName = "xana";
dbPort = 3306;
dbConnections = 10;
<<<<<<< HEAD
dbUser = "root";
dbPassword = "root";
// dbUser = "codistanxana";
// dbPassword = "Codistan@132";
=======
dbUser = "codistanxana";
dbPassword = "Codistan@132";
>>>>>>> 50365e0afe63cf798728ca02207f26f3335946b4

module.exports = {
  dbHost,
  dbName,
  dbPort,
  dbConnections,
  dbUser,
  dbPassword,
};

//  - MYSQL_ROOT_PASSWORD=Codistan@132X
//       - MYSQL_DATABASE=xana
//       - MYSQL_USER=codistanxana
//       - MYSQL_PASSWORD=Codistan@132
