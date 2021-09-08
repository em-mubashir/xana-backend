let dbHost
let dbName
let dbPort
let dbConnections
let dbUser
let dbPassword

dbHost = 'localhost'
dbName = 'xana'
dbPort = 3306
dbPassword = 'root'
dbConnections = 10
dbUser = 'root'

module.exports = {
  dbHost,
  dbName,
  dbPort,
  dbConnections,
  dbUser,
  dbPassword,
}
