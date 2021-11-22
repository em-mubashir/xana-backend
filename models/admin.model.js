const con = require("../config/mysql");
const crypto = require("crypto");
const QRCode = require("qrcode");

const {
  signJwt,
  signRefreshToken,
  signEmailToken,
} = require("../helpers/jwt.helpers");

const sessionModel = require("./session.model");
require("colors");

const mycrypto = {
  encrypt: (password) => {
    const cipher = crypto.createCipher("aes192", process.env.HASH_KEY);
    let hashedPassword = cipher.update(`${password}`, "utf8", "hex");
    hashedPassword += cipher.final("hex");
    return hashedPassword;
  },

  decrypt: (hashed) => {
    const decipher = crypto.createDecipher("aes192", process.env.HASH_KEY);
    let decrypted = decipher.update(`${hashed}`, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
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
      con.query(`select * from test_info`, (err, res) => {
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
      con.query(`select * from users`, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }),

  adminLogin: (user) =>
    new Promise((resolve, reject) => {
      console.log(user);

      con.query(
        `select * from users where email='${user.email}' AND roleId_fk = 2 LIMIT 1`,
        // `select * from users where email='${user.email}'`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              const { password: hashedPassword } = res[0];
              let validPass = 0;
              const decrypted = await mycrypto.decrypt(hashedPassword);
              if (decrypted === user.password) {
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
                console.log("res[0].id :: ", res[0].id);
                console.log("session", session);
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
                  message: "Password is incorrect",
                });
              }
            } else {
              return reject({
                data: err,
                valid: false,
                status: 404,
                message: "User is not registered.",
              });
            }
          } else {
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  adminSignup: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          console.log("first query run successfully");
          if (res !== undefined && res.length !== 0) {
            return reject(new Error("User already exists", err));
          } else {
            const hashedPassword = await mycrypto.encrypt(user.password);
            console.log("hashedPassword", hashedPassword);
            const sql = `INSERT into users (first_name, last_name, email, mobile, password, roleid_fk, confirmed) values ('${user.fname}','${user.lname}','${user.email}','${user.mobile}','${hashedPassword}',2,1)`;
            con.query(sql, (err, res) => {
              console.log("res", res);
              console.log("sql run successfully", sql);
              if (res) {
                return resolve(res);
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            });
          }
        }
      );
    }),

  updateReportStatus: (status) =>
    new Promise((resolve, reject) => {
      con.query(
        `update reports set status = '${status.status}' where reportId = ${status.id}`,
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

  generateQr: (qrObj) =>
    new Promise(async (resolve, reject) => {
      console.log(qrObj);
      let generatedQr = [];
      for (let i = 0; i < qrObj.length; i++) {
        await QRCode.toDataURL(JSON.stringify(qrObj[i]), {
          errorCorrectionLevel: "H",
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        })
          .then((url) => {
            generatedQr.push(url);
          })
          .catch((err) => {
            console.error(err);
            return reject(err);
          });
      }
      console.log("generatedQr :: >>", generatedQr);
      generatedQr.map((item) => {
        console.log("item", item);
      });
      // con.query(
      //   `insert into qr_codes (qr_code) values ?`[generatedQr.map((i) => [i])],
      //   (err, res) => {
      //     if (res) {
      //       console.log(res);
      //       return resolve(res);
      //     } else {
      //       console.log("err", err);
      //       return reject(new Error("Something went wrong", err));
      //     }
      //   }
      // );
    }),
};

module.exports = adminModel;
