const con = require("../config/mysql");
const crypto = require("crypto");

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

  adminLogin: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' AND roleId_fk = 2 LIMIT 1`,
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
                return resolve({ data: res, valid: true });
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
          if (res !== undefined && res.length !== 0) {
            return reject(new Error("Email already exists", err));
          } else {
            const hashedPassword = await mycrypto.encrypt(user.password);
            console.log("hashedPassword", hashedPassword);
            const sql = `INSERT into users (name, email, mobile, password, roleId_fk,confirmed) values ('${user.name}','${user.email}','${user.mobile}','${hashedPassword}',2,1)`;
            con.query(sql, (err, res) => {
              console.log("res", res);
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
};

module.exports = adminModel;
