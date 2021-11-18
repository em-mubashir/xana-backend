const con = require("../config/mysql");
const testModel = {
  addNew: (testObj, userId) =>
    new Promise(async (resolve, reject) => {
      con.query(
        `INSERT INTO test_info (userId, test_name, test_manufacturer, test_description, test_performance, test_authorisation,qr_id) VALUES ('${userId}', '${testObj.testName}','${testObj.Manufacturer}', '${testObj.Description}', '${testObj.Performance}', '${testObj.Authorisation}','${testObj.qrId}')`,
        (err, res) => {
          if (res) {
            if (res.affectedRows > 0) {
              return resolve(res.insertId);
            }
          } else {
            console.log("err", err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  saveImage: (path, id) =>
    new Promise((resolve, reject) => {
      console.log("save image", path, id);
      con.query(
        `UPDATE test_info set test_image = '${
          process.env.IMAGE + path
        }' where id=${id}`,

        (err, res) => {
          console.log(
            `UPDATE test_info set test_image = '${
              process.env.IMAGE + path
            }' where id=${id}`
          );
          if (err) {
            console.log("error", err);
            return reject(new Error(err));
          } else {
            return resolve(res);
          }
        }
      );
    }),

  getUserTestImg: (id) =>
    new Promise((resolve, reject) => {
      console.log(`select test_image from test_info where id=${id}`);
      con.query(
        `select test_image,qr_id from test_info where id=${id}`,
        (err, res) => {
          if (err) {
            console.log("error", err);
            return reject(new Error(err));
          } else {
            return resolve(res[0]);
          }
        }
      );
    }),

  addReportResult: (result, id) =>
    new Promise((resolve, reject) => {
      con.query(
        `update  test_info set result= '${result}' where id=${id}`,
        (err, res) => {
          if (err) {
            console.log("error", err);
            return reject(new Error(err));
          } else {
            return resolve({ message: "Test updated successfully", result });
          }
        }
      );
    }),
};

module.exports = testModel;
