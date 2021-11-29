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

  addCustomReport: (data) =>
    new Promise((resolve, reject) => {
      console.log("Report data ::: >>>", data);
      console.log(
        `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name, test_manufacturer, test_authorization, test_description) VALUES (
          '${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', 'Completed', '${data.test_name}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}'
        )`
      );
      con.query(
        `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name, test_manufacturer, test_authorization, test_description) VALUES (
          '${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', 'Completed', '${data.test_name}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}'
        )`,
        (err, res) => {
          if (res) {
            if (res.affectedRows > 0) {
              console.log();
              return resolve(res);
            } else {
              console.log("err", err);
              return reject(new Error("Something went wrong", err));
            }
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
