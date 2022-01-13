const con = require('../config/mysql');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const {
  signJwt,
  signRefreshToken,
  signEmailToken,
} = require('../helpers/jwt.helpers');
const sessionModel = require('./session.model');
const { dbPassword } = require('../environment');
require('colors');

// const iv = crypto.randomBytes(16);
const mycrypto = {
  funcHashPassword: async (password) => {
    const hashPassword = await bcrypt.hash(password, 12);
    if (hashPassword) {
      return hashPassword;
    } else {
      return null;
    }
  },

  funcComparePassword: async (reqBodyPassword, dbPassword) => {
    const verifiedPassword = await bcrypt.compare(reqBodyPassword, dbPassword);
    if (verifiedPassword) {
      return verifiedPassword;
    } else {
      return false;
    }
  },
};

const adminModel = {
  getAllReports: () =>
    new Promise((resolve, reject) => {
      con.query(`select * from reports`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }),

  getAllTest: () =>
    new Promise((resolve, reject) => {
      con.query(`select * from test_info ORDER BY id DESC`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }),

  getAllCustomReport: () =>
    new Promise((resolve, reject) => {
      con.query(`select * from custom_report ORDER BY id DESC`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }),

  getReportDetail: (reportId) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from reports where reportId=${reportId}`,
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        }
      );
    }),

  getAllUsers: () =>
    new Promise((resolve, reject) => {
      con.query(`select * from users ORDER BY id DESC`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }),

  // addCustomReport: (data) =>
  //   new Promise((resolve, reject) => {
  //       `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name, test_manufacturer, test_authorization, test_description) VALUES (
  //         '${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', 'Completed', '${data.test_name}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}'
  //       )`
  //     );
  //     con.query(
  //       `INSERT INTO custom_report (first_name, last_name, email, dob, passport, sample_date, sample_time, result_date, result_time, order_id, result, test_name, test_manufacturer, test_authorization, test_description) VALUES (
  //         '${data.first_name}','${data.last_name}','${data.email}', '${data.dob}', '${data.passport}', '${data.sample_date}', '${data.sample_time}',  '${data.result_date}', '${data.result_time}' , '${data.order_id}', 'Completed', '${data.test_name}', '${data.test_manufacturer}', '${data.test_authorization}', '${data.test_description}'
  //       )`,
  //       (err, res) => {
  //         if (res) {
  //           if (res.affectedRows > 0) {
  //             return resolve(res);
  //           } else {
  //             return reject(new Error("Something went wrong", err));
  //           }
  //         }
  //       }
  //     );
  //   }),

  adminLogin: (user) =>
    new Promise((resolve, reject) => {
      console.log(user);
      console.log(
        `select * from users where email='${user.email}' AND roleId_fk = 2 LIMIT 1`
      );
      con.query(
        `select * from users where email='${user.email}' AND roleId_fk = 2 LIMIT 1`,
        // `select * from users where email='${user.email}'`,
        async (err, res) => {
          console.log(err);
          console.log(res);
          if (res) {
            console.log('In if');
            console.log(res);

            if (res.length !== 0) {
              const { password: hashedPassword } = res[0];
              console.log('Hashed Password', hashedPassword);
              let validPass = 0;
              // const decrypted = await mycrypto.decrypt(hashedPassword);
              const verifiedCompare = await mycrypto.funcComparePassword(
                user.password,
                hashedPassword
              );
              console.log('Verified password', verifiedCompare);
              console.log('user entered password', user.password);

              // if (decrypted === user.password) {
              //   validPass = true;
              // } else {
              //   validPass = false;
              // }
              if (verifiedCompare) {
                validPass = true;
              } else {
                validPass = false;
              }
              if (validPass) {
                const accessToken = await signJwt({ payload: res[0].id });
                const refreshToken = await signRefreshToken({
                  payload: res[0].id,
                });
                const session = await sessionModel.createSession(
                  res[0].id,
                  refreshToken
                );
                const payload = {
                  userId: session.userId,
                  sessionId: session.sessionId,
                  accessToken,
                  refreshToken,
                };
                return resolve({ data: res, payload: payload, valid: true });
              } else {
                return reject({
                  data: err,
                  valid: false,
                  status: 500,
                  message: 'Password is incorrect',
                });
              }
            } else {
              return reject({
                data: err,
                valid: false,
                status: 404,
                message: 'User is not registered.',
              });
            }
          } else {
            return reject(new Error('Something went wrong', err));
          }
        }
      );
    }),

  adminSignup: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res !== undefined && res.length !== 0) {
            return reject(new Error('User already exists', err));
          } else {
            // const hashedPassword = await mycrypto.encrypt(user.password);
            const hashedPassword = await mycrypto.funcHashPassword(
              user.password
            );
            const sql = `INSERT into users (first_name, last_name, email, mobile, password, roleid_fk, confirmed) values ('${user.fname}','${user.lname}','${user.email}','${user.mobile}','${hashedPassword}',2,1)`;
            con.query(sql, (err, res) => {
              if (res) {
                return resolve(res);
              } else {
                return reject(new Error('Something went wrong', err));
              }
            });
          }
        }
      );
    }),
  sendForgotPasswordMail: async (user) =>
    await new Promise((resolve, reject) => {
      console.log('user email: ', user.email);
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' AND roleId_fk=2 LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length === 0) {
              return reject(new Error('Email not registered'));
            } else {
              const userId = res[0]['id'];
              const code = Math.floor(1000 + Math.random() * 9000);
              console.log('code::>> ', code);
              const emailToken = jwt.sign(
                {
                  id: userId,
                  email: user.email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: '3h',
                }
              );
              const url = `${process.env.URL}/api/user/reset-password/${emailToken}`;
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'mmm28800@gmail.com',
                  pass: '  1310125897819  ',
                },
                // host: "mail.codistan.org",
                // port: 465,
                // secure: true, // true for 465, false for other ports
                // auth: {
                //   user: "malik.mubashir@codistan.org",
                //   pass: "Mailk@Mubashir321",
                // },
              });
              const mailOptions = {
                from: 'mmm28800@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: 'Password reset Link', // Subject line
                html: `<p>Your email verification code is ${code}</p>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                  return reject(new Error('Something went wrong', err));
                } else {
                  console.log('in else');
                  con.query(
                    `UPDATE users SET code = '${code}' WHERE id=${userId} `,
                    (err, res) => {
                      console.log('res::', res);
                      console.log('err::', err);
                      if (err) {
                        console.log(err);
                        return reject(new Error('Something went wrong'));
                      } else {
                        console.log('info: ' + info);
                        return resolve(res);
                      }
                    }
                  );
                }
              });
            }
          } else {
            console.log(err);
            return reject(new Error('Something went wrong', err));
          }
        }
      );
    }),
  updateReportStatus: (status) =>
    new Promise((resolve, reject) => {
      con.query(
        `update test_info set result = '${status.result}' where id = ${status.id}`,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            return reject(new Error('Something went wrong', err));
          }
        }
      );
    }),

  updateCustomReportStatus: (status) =>
    new Promise((resolve, reject) => {
      con.query(
        `update custom_report set result = '${status.result}' where id = ${status.id}`,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            return reject(new Error('Something went wrong', err));
          }
        }
      );
    }),

  generateQr: (qrObj) =>
    new Promise(async (resolve, reject) => {
      let generatedQr = [];
      for (let i = 0; i < qrObj.length; i++) {
        await QRCode.toDataURL(JSON.stringify(qrObj[i]), {
          errorCorrectionLevel: 'H',
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        })
          .then((url) => {
            generatedQr.push(url);
          })
          .catch((err) => {
            return reject(err);
          });
      }
      generatedQr.map((item) => {});
      // con.query(
      //   `insert into qr_codes (qr_code) values ?`[generatedQr.map((i) => [i])],
      //   (err, res) => {
      //     if (res) {
      //       return resolve(res);
      //     } else {
      //       return reject(new Error("Something went wrong", err));
      //     }
      //   }
      // );
    }),
};

module.exports = adminModel;
