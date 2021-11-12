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
      con.query(
        `UPDATE test_info set test_image = '${
          process.env.IMAGE + path
        }' where id=${id}`,
        (err, res) => {
          if (err) {
            console.log("error", err);
            return reject(new Error(err));
          } else {
            return resolve(res);
          }
        }
      );
    }),
};

module.exports = testModel;
