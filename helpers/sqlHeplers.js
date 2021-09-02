const connection = require("../config/mysql");

const sqlHelper = {
  /*
   will return SQL Exception in json
    */
  consoleSQLException(err) {
    return (errorMessage = {
      code: err.code,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      index: err.index,
      sql: err.sql,
    });
  },

  consoleSQLResult(result) {
    return {
      fieldCount: result.fieldCount,
      affectedRows: result.affectedRows,
      insertId: result.insertId,
      serverStatus: result.serverStatus,
      warningCount: result.warningCount,
      message: result.message,
      protocol41: result.protocol41,
      changedRows: result.changedRows,
    };
  },
};

module.exports = sqlHelper;
