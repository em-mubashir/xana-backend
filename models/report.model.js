const con = require("../config/mysql");

const reportModel = {
  getAllReports: (userId) =>
    new Promise(async (resolve, reject) => {
      con.query(
        `select * from reports where userId='${userId}' `,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            console.log("err", err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  getReport: (userId, orderId) =>
    new Promise(async (resolve, reject) => {
      con.query(
        `select * from reports where userId='${userId}' and reportId='${orderId}' `,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            console.log("err", err);
            return reject(new Error("Report not found", err));
          }
        }
      );
    }),

  postReports: (data) =>
    new Promise((resolve, reject) => {
      console.log("dataaa ::: >>>", data);
      con.query(
        `select * from users where id='${data.userId}' LIMIT 1`,
        (error, userData) => {
          console.log("userdataaaaaa", userData);
          console.log(`INSERT INTO reports
          (userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, sampleTime, resultDate, resultTime, result, status)
          VALUES
          ( ${userData[0].id}, '${userData[0].first_name}','${
            userData[0].last_name || ""
          }', '${userData[0].dob || ""}', '${userData[0].passportNo || ""}', '${
            data.testName
          }', '${data.testManufacturer}', '${data.testDescription}', '${
            data.testPerformance
          }', '${data.testAuthorization}', '${data.sampleDate || ""}','${
            data.sampleTime || ""
          }', '${data.resultDate || ""}', '${data.resultTime || ""}','${
            data.result || ""
          }', 'completed' ) `);
          con.query(
            `INSERT INTO reports
          (userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, sampleTime, resultDate, resultTime, result, status)
          VALUES
          ( ${userData[0].id}, '${userData[0].first_name}','${
              userData[0].last_name || ""
            }', '${userData[0].dob || ""}', '${
              userData[0].passportNo || 0
            }', '${data.testName}', '${data.testManufacturer}', '${
              data.testDescription
            }', '${data.testPerformance}', '${data.testAuthorization}', '${
              data.sampleDate || ""
            }','${data.sampleTime || ""}', '${data.resultDate || ""}', '${
              data.resultTime || ""
            }','${data.result || ""}', 'completed' ) `,
            (err, res) => {
              if (res) {
                if (res.affectedRows > 0) {
                  return resolve(res);
                }
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            }
          );
        }
      );
    }),
};

module.exports = reportModel;
