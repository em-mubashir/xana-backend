const con = require("../config/mysql");

const sessionModel = {
  createSession: (id, refreshToken) =>
    new Promise((resolve, reject) => {
      const sessionId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      con.query(
        `select * from sessions where user_id=${id}`,
        (error, result) => {
          if (error) return reject(error);
          if (result.length > 0) {
            con.query(
              `UPDATE sessions SET session_id="${sessionId}",session_token="${refreshToken}" where user_id = ${id}`,
              (er, re) => {
                if (er) return reject(er);
                return resolve({ sessionId: sessionId, userId: id });
              }
            );
          } else {
            con.query(
              `Insert into sessions (session_id,user_id,session_token) values ('${sessionId}','${id}','${refreshToken}')`,
              (err, res) => {
                if (err) {
                  return reject(err);
                } else {
                  return resolve({ sessionId: sessionId, userId: id });
                }
              }
            );
          }
        }
      );
    }),

  verifySession: (id) =>
    new Promise((resolve, reject) => {
      con.query(`select * from sessions where user_id =${id} `, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res[0]);
        }
      });
    }),

  invalidateSession: (userId) =>
    new Promise((resolve, reject) => {
      con.query(
        `delete from sessions where user_id = ${userId}`,
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    }),
};

module.exports = sessionModel;
