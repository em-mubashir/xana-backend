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
        `select * from reports where userId='${userId}' and orderId='${orderId}' `,
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
        `INSERT INTO reports 
        (userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, resultDate, result) 
        VALUES 
        ( ${data.userId}, '${data.firstName}','${data.lastName}', STR_TO_DATE('${data.dob}','%d-%m-%Y'), '${data.passportNo}', '${data.testName}', '${data.testManufacturer}', '${data.testDescription}', '${data.testPerformance}', '${data.testAuthorization}', STR_TO_DATE('${data.sampleDate}','%d-%m-%Y'), STR_TO_DATE('${data.resultDate}','%d-%m-%Y'), '${data.result}' ) `,
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
    }),
};

module.exports = reportModel;
