const con = require("../config/mysql");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const { use } = require("../routes/user.route");
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
const userModel = {
  register: (user) =>
    new Promise(async (resolve, reject) => {
      console.log("user", user);
      // Email duplication check

      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res !== undefined && res.length !== 0) {
            return reject(new Error("Email already exists", err));
          } else {
            // const hashedPassword = await bcrypt.hash(`${user.password}`, 10);
            const hashedPassword = await mycrypto.encrypt(user.password);
            console.log("hashedPassword", hashedPassword);

            const sql = `INSERT into users (name, email, mobile, password, roleId_fk) values ('${user.name}','${user.email}','${user.mobile}','${hashedPassword}',1)`;
            con.query(sql, (err, res) => {
              console.log("res", res);
              if (res) {
                if (res.affectedRows > 0) {
                  const emailToken = jwt.sign(
                    {
                      id: `${res.insertId}`,
                      email: user.email,
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "3h",
                    }
                  );
                  const url = `${process.env.URL}/api/user/confirmation/${emailToken}`;
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    auth: {
                      user: "mmm28800@gmail.com",
                      pass: "  1310125897819  ",
                    },
                    // host: "mail.codistan.org",
                    // port: 465,
                    // secure: true, // true for 465, false for other ports
                    // auth: {
                    //   user: "malik.mubashir@codistan.org",
                    //   pass: "Mailk@Mubashir321",
                    // },
                  });
                  console.log("user.email :>>", user.email);
                  const mailOptions = {
                    from: "malik.mubashir@codistan.org", // sender address
                    to: user.email, // list of receivers
                    subject: "Email verification", // Subject line
                    html: `<p>${url}</p>`, // plain text body
                  };
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                      console.log(err);
                      return reject(new Error("Something went wrong", err));
                    } else {
                      console.log("info: >>>>> " + info);
                      return resolve(res);
                    }
                  });
                }
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            });
          }
        }
      );
    }),

  registerGmail: async (user) => {
    await new Promise((resolve, reject) => {
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        (err, res) => {
          if (res) {
            if (res.length !== 0) {
              return reject("Email already exists");
            } else {
              const sql = `INSERT into users (name, email, roleId_fk, confirmed) values ('${user.name}','${user.email}',1, 1)`;
              con.query(sql, (err, res) => {
                if (res) {
                  console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold);
                  if (res.affectedRows > 0) {
                    console.log(res);
                    return resolve(res);
                  } else {
                    return reject(new Error("Error adding user"));
                  }
                } else {
                  console.log("err", err);
                  return reject(new Error("Something went wrong", err));
                }
              });
            }
          } else {
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    });
  },

  verifyEmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `Update users SET confirmed=1 where id='${user.id}'`,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            console.log(err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),
  login: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              if (res[0]["confirmed"] != 1) {
                return reject(new Error("Email not verified"));
              }
              const { password: hashedPassword } = res[0];
              // = await bcrypt.compare(
              //   user.password,
              //   hashedPassword
              // );
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

  loginGmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            return res.length !== 0
              ? resolve({ data: res, valid: true })
              : reject(new Error("Email not registered", err));
          } else {
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  getProfile: (userId) =>
    new Promise((resolve, reject) => {
      if (!isNaN(userId)) {
        con.query(
          `select * from users where id='${userId}' LIMIT 1`,
          (err, res) => {
            if (res.length !== 0) {
              return resolve(res);
            } else {
              console.log("err", err);
              return reject(new Error("Invalid User Id", err));
            }
          }
        );
      } else {
        return reject(new Error("Invalid User Id"));
      }
    }),

  updateProfile: (userId, userData) =>
    new Promise(async (resolve, reject) => {
      // User validation Check
      con.query(
        `select * from users where id='${userId}' LIMIT 1`,
        async (err, res) => {
          console.log(res);
          if (res.length === 0) {
            return reject(new Error("User not exists"));
          } else if (err) {
            return reject(new Error("Something went wrong", err));
          } else {
            const name = userData.name || res.name;
            const mobile = userData.mobile || null;
            const image = userData.image || null;
            const address = userData.address || null;
            const password =
              userData.password || null
                ? await mycrypto.encrypt(userData.password)
                : // await bcrypt.hash(`${userData.password}`, 10)
                  null;

            const sql = `UPDATE users SET name='${name}',mobile='${mobile}',password='${password}',image='${image}', address='${address}' WHERE id='${userId}'`;

            con.query(sql, (err, res) => {
              if (res) {
                console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold);
                if (res.affectedRows > 0) {
                  console.log("updated");
                  return resolve(res);
                }
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            });
          }
        }
      );
    }),

  sendForgotPasswordMail: async (user) =>
    await new Promise((resolve, reject) => {
      console.log("user email: ", user.email);
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length === 0) {
              return reject(new Error("Email not registered"));
            } else {
              const userId = res[0]["id"];
              const emailToken = jwt.sign(
                {
                  id: userId,
                  email: user.email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "3h",
                }
              );
              const url = `${process.env.URL}/api/user/reset-password/${emailToken}`;
              const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                  user: "mmm28800@gmail.com",
                  pass: "  1310125897819  ",
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
                from: "mmm28800@gmail.com", // sender address
                to: user.email, // list of receivers
                subject: "Password reset Link", // Subject line
                html: `<p>${url}</p>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                  return reject(new Error("Something went wrong", err));
                } else {
                  console.log("in else");
                  con.query(
                    `UPDATE users SET token = '${emailToken}' WHERE id=${userId} `,
                    (err, res) => {
                      console.log("res::", res);
                      console.log("err::", err);
                      if (err) {
                        console.log(err);
                        return reject(new Error("Something went wrong"));
                      } else {
                        console.log("info: " + info);
                        return resolve(res);
                      }
                    }
                  );
                }
              });
            }
          } else {
            console.log(err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  resetPasswordVerify: async (user, token, password) =>
    await new Promise((resolve, reject) => {
      con.query(
        `select * from users where id='${user.id}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            console.log(`${res[0]["token"]}`.green);
            if (res.length === 0) {
              return reject(new Error(`User with id ${user.id} not found`));
            } else {
              if (token === res[0]["token"]) {
                con.query(
                  `UPDATE users SET token=null WHERE id=${user.id}`,
                  (err, res) => {
                    if (res) {
                      console.log(res);
                      return resolve(res);
                    } else {
                      console.log(err);
                      return reject(new Error("Something went wrong ", err));
                    }
                  }
                );
              } else {
                console.log("Token not equal");
                return reject(new Error("Token Failed"));
              }
            }
          } else {
            console.log(err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  refreshToken: async (id) =>
    await new Promise((resolve, reject) => {
      const reFreshToken = jwt.sign(
        {
          id: id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "3h",
        }
      );
      return resolve(reFreshToken);
    }),

  updatePassword: async (password, userId) =>
    await new Promise(async (resolve, reject) => {
      console.log("password", password);
      console.log("userId", userId);
      const hashedPassword = await mycrypto.encrypt(password);
      // await bcrypt.hash(`${password}`, 10);
      con.query(
        `select * from users where id='${userId}' LIMIT 1`,
        (error, result) => {
          if (error) {
            console.log("error", error);
            return reject(
              new Error("Something went wrong while updating password", error)
            );
          } else {
            con.query(
              `UPDATE users SET password = '${hashedPassword}', token=null WHERE id=${userId}`,
              (err, res) => {
                if (res) {
                  return resolve(res);
                } else {
                  console.log("error", err);
                  return reject(
                    new Error(
                      "Something went wrong while updating password",
                      err
                    )
                  );
                }
              }
            );
          }
        }
      );
    }),
};

module.exports = userModel;
