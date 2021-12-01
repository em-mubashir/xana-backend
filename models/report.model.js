const con = require("../config/mysql");
const nodemailer = require("nodemailer");

const reportModel = {
  sendCustomReport: (data) => {

    let pdfFiles = [];
    pdfFiles.push(data.file);

    try {
      const transporter = nodemailer.createTransport({
        // host: process.env.HOST,
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
          // user: process.env.FROM,
          user: "info@landofsneakers.com",
          // pass: process.env.PASSWORD,
          pass: "0b8pEBjPtFRK2Txy",
        },
      });
      const mailOptions = {
        // FROM=info@landofsneakers.com
        // PASSWORD=0b8pEBjPtFRK2Txy
        // HOST=smtp-relay.sendinblue.com
        // EMAIL_PORT=587

        // from: process.env.FROM,
        from: "info@landofsneakers.com",
        // to: `${data.email}`,
        to: "saqibkhan7112@gmail.com",
        cc: "beenishkhan603@gmail.com",
        subject: "Result Of Report",
        // html: message,
        attachments: pdfFiles,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return err.message;
        } else {
          return info.response;
        }
      });
      return {
        status: 200,
        message: `Success`,
        // message:token
      };
    } catch (error) {
      throw new Error(error.message);
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
            return reject(new Error("Report not found", err));
          }
        }
      );
    }),

  addCustomReport: async (data) => {

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name, test_manufacturer, test_authorization, test_description, test_image) VALUES (
          '${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', '${data.result}', '${data.test_name}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}', '${data.test_image}'
        )`;
      return con.query(query, (err, rows) => {
        if (!err) {
          return resolve(rows)
        }
        else {
          return reject(err.message)
        }
      })
    })
  },





  postReports: (data) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where id='${data.userId}' LIMIT 1`,
        (error, userData) => {

          con.query(
            `INSERT INTO reports
          (userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, sampleTime, resultDate, resultTime, result, status)
          VALUES
          ( ${userData[0].id}, '${userData[0].first_name}','${userData[0].last_name || ""
            }', '${userData[0].dob || ""}', '${userData[0].passportNo || 0
            }', '${data.testName}', '${data.testManufacturer}', '${data.testDescription
            }', '${data.testPerformance}', '${data.testAuthorization}', '${data.sampleDate || ""
            }','${data.sampleTime || ""}', '${data.resultDate || ""}', '${data.resultTime || ""
            }','${data.result || ""}', 'completed' ) `,
            (err, res) => {
              if (res) {
                if (res.affectedRows > 0) {
                  return resolve(res);
                }
              } else {
                return reject(new Error("Something went wrong", err));
              }
            }
          );
        }
      );
    }),
};

module.exports = reportModel;
