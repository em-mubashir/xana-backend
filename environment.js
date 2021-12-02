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
dbUser = "root";
dbPassword = "root";

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
