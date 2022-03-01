const con = require('../config/mysql');
const nodemailer = require('nodemailer');
const fileSystemUtils = require('../utils/fileSystemUtils');
const reportModel = {
  sendCustomReport: async (imagePath, pdfPath, userEmail) => {
    try {
      console.log(userEmail);
      console.log('insdide');

      // GMAIL_SERVICE_NAME = gmail
      // GMAIL_SERVICE_HOST = smtp.gmail.com
      // GMAIL_SERVICE_SECURE = true
      // GMAIL_SERVICE_PORT = 465
      // GMAIL_USER_NAME = maliksblr92@gmail.com
      // GMAIL_USER_PASSWORD = ZP ? []~1F6M) _
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 2525,
        secure: false,
        auth: {
          user: process.env.FROM,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.FROM,
        to: userEmail,
        subject: 'Result Of Report',
        html: '<html><p>PFA. The Attachment consist of the result of the test </p></html>',
        attachments: [
          {
            filename: 'report.pdf',
            path: pdfPath,
            contentType: 'application/pdf',
          },
          { filename: 'report.png', path: imagePath, contentType: 'image/png' },
        ],
      };
      const res = await transporter.sendMail(mailOptions);
      const reportImage = await fileSystemUtils.unlinkFileAsync(imagePath);
      const reportPdf = await fileSystemUtils.unlinkFileAsync(pdfPath);
      console.log('res,', res.accepted);
      console.log('res,', res.rejected);
      console.log('res,', res.response);
      return res;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  },

  getAllReports: (userId) =>
    new Promise(async (resolve, reject) => {
      con.query(
        `select * from reports where userId='${userId}' `,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            return reject(new err('Something went wrong', err));
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
            return reject(new err('Report not found', err));
          }
        }
      );
    }),

  addCustomReport: async (data) => {
    return new Promise((resolve, reject) => {
      console.log('in add custom eport');
      const query = `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name,type, test_manufacturer, test_authorization, test_description, test_image, reportURL) VALUES ('${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', '${data.result}', '${data.test_name}','${data.test_type}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}', '${data.test_image}', '${data.reportURL}')`;
      return con.query(query, (err, rows) => {
        if (!err) {
          return resolve(rows);
        } else {
          return reject(err.message);
        }
      });
    });
  },

  postReports: (data) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where id='${data.userId}' LIMIT 1`,
        (err, userData) => {
          con.query(
            `INSERT INTO reports
          (userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, sampleTime, resultDate, resultTime, result, status)
          VALUES
          ( ${userData[0].id}, '${userData[0].first_name}','${
              userData[0].last_name || ''
            }', '${userData[0].dob || ''}', '${
              userData[0].passportNo || 0
            }', '${data.testName}', '${data.testManufacturer}', '${
              data.testDescription
            }', '${data.testPerformance}', '${data.testAuthorization}', '${
              data.sampleDate || ''
            }','${data.sampleTime || ''}', '${data.resultDate || ''}', '${
              data.resultTime || ''
            }','${data.result || ''}', 'completed' ) `,
            (err, res) => {
              if (res) {
                if (res.affectedRows > 0) {
                  return resolve(res);
                }
              } else {
                return reject(new err('Something went wrong', err));
              }
            }
          );
        }
      );
    }),
};

module.exports = reportModel;
