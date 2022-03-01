const con = require('../config/mysql');
const testModel = {
  addNew: (testObj, userId) =>
    new Promise(async (resolve, reject) => {
      const d = new Date();
      let date = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      let seconds = d.getSeconds();

      let newdate =
        year +
        '/' +
        month +
        '/' +
        date +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        seconds;
      console.log(date);
      console.log(month);
      console.log(year);
      console.log(hour);
      console.log(minute);
      console.log(seconds);
      console.log('dateeeeeeeeeeeeeeeee', newdate);

      con.query(
        `INSERT INTO test_info (userId, test_name, test_manufacturer,test_image, test_description, test_performance, test_authorisation, date_register, date_conduct, qr_id ,video ) VALUES ('${userId}', '${testObj.testName}','${testObj.Manufacturer}','${testObj.test_image}', '${testObj.Description}', '${testObj.Performance}', '${testObj.Authorisation}','${newdate}','${newdate}','${testObj.qrId}','${testObj.video}')`,
        (err, res) => {
          if (res) {
            if (res.affectedRows > 0) {
              return resolve(res.insertId);
            }
          } else {
            console.log('err', err);
            return reject(new Error('Something went wrong', err));
          }
        }
      );
    }),

  saveImage: (path, id) =>
    new Promise((resolve, reject) => {
      console.log('save image', path, id);
      con.query(
        `UPDATE test_info set test_image = '${path}' where id=${id}`,

        (err, res) => {
          console.log(
            `UPDATE test_info set test_image = '${path}' where id=${id}`
          );
          if (err) {
            console.log('error', err);
            return reject(new Error(err));
          } else {
            return resolve(res);
          }
        }
      );
    }),
  saveVideo: (path, id) =>
    new Promise((resolve, reject) => {
      console.log('save image', path, id);
      con.query(
        `UPDATE test_info set video = '${path}' where id=${id}`,

        (err, res) => {
          console.log(
            `UPDATE test_info set test_image = '${path}' where id=${id}`
          );
          if (err) {
            console.log('error', err);
            return reject(new Error(err));
          } else {
            return resolve(res);
          }
        }
      );
    }),

  getUserTestImg: (id) =>
    new Promise((resolve, reject) => {
      // console.log(`select test_image from test_info where id=${id}`);
      con.query(
        `select test_image,qr_id from test_info where id=${id}`,
        (err, res) => {
          if (err) {
            console.log('error', err);
            return reject(err);
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
            console.log('error', err);
            return reject(new Error(err));
          } else {
            return resolve({ message: 'Test updated successfully', result });
          }
        }
      );
    }),
  reportURL: (link, id) =>
    new Promise((resolve, reject) => {
      con.query(
        `update  test_info set report_url= '${link}' where id=${id}`,
        (err, res) => {
          if (err) {
            console.log('error', err);
            return reject(new Error(err));
          } else {
            return resolve({ message: 'Test report url updated successfully' });
          }
        }
      );
    }),
  customReportURL: (link, id) =>
    new Promise((resolve, reject) => {
      con.query(
        `update custom_report set reportURL= '${link}' where id=${id}`,
        (err, res) => {
          if (err) {
            console.log('error', err);
            return reject(new Error(err));
          } else {
            return resolve({ message: 'Test updated successfully' });
          }
        }
      );
    }),
};

module.exports = testModel;
