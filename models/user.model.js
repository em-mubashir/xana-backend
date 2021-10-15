const con = require("../config/mysql");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const { use } = require("../routes/user.route");
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
const userModel = {
  register: (user) =>
    new Promise(async (resolve, reject) => {
      console.log("user", user);
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res !== undefined && res.length !== 0) {
            return reject(new Error("User already exists", err));
          } else {
            // const hashedPassword = await bcrypt.hash(`${user.password}`, 10);
            const hashedPassword = await mycrypto.encrypt(user.password);
            console.log("hashedPassword", hashedPassword);
            const sql = `INSERT into users (first_name,last_name, email, mobile, password, roleId_fk) values ('${user.firstName}','${user.lastName}','${user.email}','${user.mobile}','${hashedPassword}',1)`;
            con.query(sql, async (err, res) => {
              console.log("res", res);
              if (res) {
                if (res.affectedRows > 0) {
                  const emailToken = await signEmailToken({
                    payload: {
                      id: `${res.insertId}`,
                      email: user.email,
                    },
                  });
                  const url = `https://xanamedtec.page.link/?link=http://192.168.18.14:3000/user/verification/${emailToken}&apn=com.xanamedtec
                   `;
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
                    html: `<a href="${url}">Verify Email</a>`, // plain text body
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
              return reject("User already exists");
            } else {
              const sql = `INSERT into users (first_name,last_name, email, roleId_fk, confirmed) values ('${user.firstName}','${user.lastName}','${user.email}',1, 1)`;
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
        `select * from users where email='${user.email}' AND roleId_fk=1 LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              if (res[0]["confirmed"] != 1) {
                return reject(
                  new Error("Please verify your email in order to login")
                );
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

                // send user back
                return resolve(payload);

                // return resolve({ data: res, valid: true });
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
                message: "Invalid email/password",
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
            if (res.length !== 0) {
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

              // send user back
              return resolve(payload);
            } else {
              reject(new Error("Email not registered", err));
            }
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
        return reject(new Error("Invalid user id in token"));
      }
    }),

  updateProfile: (userId, userData) =>
    new Promise(async (resolve, reject) => {
      console.log("user id ", userId);
      console.log("user data ", userData);
      // User validation Check
      con.query(
        `select * from users where id='${userId}' LIMIT 1`,
        async (err, res) => {
          console.log("result", res);
          if (res.length === 0) {
            return reject(new Error("User not exists"));
          } else if (err) {
            return reject(new Error("Something went wrong", err));
          } else {
            const firstName = userData.firstName || res.first_name;
            const lastName = userData.lastName || res.last_name;
            const middleName = userData.middleName || res.middle_name;
            const mobile = userData.mobile || res.mobile;
            const image = userData.image || res.image;
            const address = userData.address || res.address;
            const password =
              userData.password || res.password
                ? await mycrypto.encrypt(userData.password || res.password)
                : // await bcrypt.hash(`${userData.password}`, 10)
                  null;

            const sql = `UPDATE users SET first_name='${firstName}',last_name='${lastName}',middle_name='${middleName}',mobile='${mobile}',password='${password}',image='${image}', address='${address}' WHERE id='${userId}'`;

            con.query(sql, (err, res) => {
              if (res) {
                console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold);
                if (res.affectedRows > 0) {
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
  resendCode: (email) =>
    new Promise((resolve, reject) => {
      console.log("email", email);
      const code = Math.floor(1000 + Math.random() * 9000);
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
        to: email, // list of receivers
        subject: "Password reset Link", // Subject line
        html: `<p>Your new email verification code is ${code}</p>`, // plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return reject(new Error("Something went wrong", err));
        } else {
          console.log("new code ", code);
          con.query(
            `UPDATE users SET code = '${code}' WHERE email='${email}'`,
            (err, res) => {
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
              const code = Math.floor(1000 + Math.random() * 9000);
              console.log("code::>> ", code);
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
                html: `<p>Your email verification code is ${code}</p>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                  return reject(new Error("Something went wrong", err));
                } else {
                  console.log("in else");
                  con.query(
                    `UPDATE users SET code = '${code}' WHERE id=${userId} `,
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

  resetPasswordVerify: async (token) =>
    await new Promise((resolve, reject) => {
      console.log("token", token);

      con.query(
        `select * from users where code='${token}' LIMIT 1`,
        async (err, res) => {
          if (res.length > 0) {
            return resolve(res);
          } else {
            console.log(err);
            return reject(new Error("Invalid verification code", err));
          }
        }
      );
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
              `UPDATE users SET password = '${hashedPassword}', code=null WHERE id=${userId}`,
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
