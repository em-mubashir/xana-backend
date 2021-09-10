const con = require('../config/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')
const { use } = require('../routes/user.route')
require('colors')

const userModel = {
  register: (user) =>
    new Promise(async (resolve, reject) => {
      console.log('user', user)

      // Email duplication check
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              return reject(new Error('Email already exists', err))
            } else {
              const hashedPassword = await bcrypt.hash(`${user.password}`, 10)
              const sql = `INSERT into xana.users (name, email, mobile, password, roleId_fk) values ('${user.name}','${user.email}','${user.mobile}','${hashedPassword}',1)`
              con.query(sql, (err, res) => {
                if (res) {
                  console.log(res.affectedRows)
                  if (res.affectedRows > 0) {
                    console.log('added')
                    const emailToken = jwt.sign(
                      {
                        id: `${res.insertId}`,
                        sub: user.email,
                      },
                      'xanaCoding',
                      {
                        expiresIn: '8h',
                      }
                    )

                    const url = `http://localhost:${process.env.PORT}/api/user/confirmation/${emailToken}`
                    const transporter = nodemailer.createTransport({
                      host: 'mail.codistan.pk',
                      port: 465,
                      secure: true, // true for 465, false for other ports
                      auth: {
                        user: 'malik.mubashir@codistan.org',
                        pass: 'Mailk@Mubashir321',
                      },
                    })
                    const mailOptions = {
                      from: 'malik.mubashir@codistan.org', // sender address
                      to: user.email, // list of receivers
                      subject: 'Email verification', // Subject line
                      html: `<p>${url}</p>`, // plain text body
                    }
                    transporter.sendMail(mailOptions, function (err, info) {
                      if (err) {
                        console.log(err)
                        return reject(new Error('Something went wrong', err))
                      } else {
                        console.log('info: ' + info)
                        return resolve(res)
                      }
                    })
                  }
                } else {
                  console.log('err', err)
                  return reject(new Error('Something went wrong', err))
                }
              })
            }
          } else {
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),

  registerGmail: async (user) => {
    await new Promise((resolve, reject) => {
      // Email duplication check
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        (err, res) => {
          if (res) {
            if (res.length !== 0) {
              return reject('Email already exists')
            } else {
              const sql = `INSERT into xana.users (name, email, roleId_fk, image, confirmed) values ('${user.name}','${user.email}',1, '${user.image}', 1)`
              con.query(sql, (err, res) => {
                if (res) {
                  console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold)
                  if (res.affectedRows > 0) {
                    console.log(res)
                    return resolve(res)
                  } else {
                    return reject(new Error('Error adding user'))
                  }
                } else {
                  console.log('err', err)
                  return reject(new Error('Something went wrong', err))
                }
              })
            }
          } else {
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    })
  },

  verifyEmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `Update xana.users SET confirmed=1 where id='${user.id}'`,
        (err, res) => {
          if (res) {
            return resolve(res)
          } else {
            console.log(err)
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),
  login: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              if (res[0]['confirmed'] != 1) {
                return reject(new Error('Email not verified'))
              }
              const { password: hashedPassword } = res[0]
              const validPass = await bcrypt.compare(
                user.password,
                hashedPassword
              )
              if (validPass) {
                return resolve({ data: res, valid: true })
              } else {
                return reject({
                  data: err,
                  valid: false,
                  status: 500,
                  message: 'Password is incorrect',
                })
              }
            } else {
              return reject({
                data: err,
                valid: false,
                status: 404,
                message: 'User is not registered.',
              })
            }
          } else {
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),

  loginGmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            return res.length !== 0
              ? resolve({ data: res, valid: true })
              : reject(new Error('Email not registered', err))
          } else {
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),

  getProfile: (userId) =>
    new Promise((resolve, reject) => {
      if (!isNaN(userId)) {
        con.query(
          `select * from xana.users where id='${userId}' LIMIT 1`,
          (err, res) => {
            if (res.length !== 0) {
              return resolve(res)
            } else {
              console.log('err', err)
              return reject(new Error('Invalid User Id', err))
            }
          }
        )
      } else {
        return reject(new Error('Invalid User Id'))
      }
    }),

  updateProfile: (userId, userData) =>
    new Promise(async (resolve, reject) => {
      // User validation Check
      con.query(
        `select * from xana.users where id='${userId}' LIMIT 1`,
        async (err, res) => {
          console.log(res)
          if (res.length === 0) {
            return reject(new Error('User not exists'))
          } else if (err) {
            return reject(new Error('Something went wrong', err))
          } else {
            const name = userData.name || res.name
            const mobile = userData.mobile || null
            const image = userData.image || null
            const address = userData.address || null
            const password =
              userData.password || null
                ? await bcrypt.hash(`${userData.password}`, 10)
                : null

            const sql = `UPDATE xana.users SET name='${name}',mobile='${mobile}',password='${password}',image='${image}', address='${address}' WHERE id='${userId}'`

            con.query(sql, (err, res) => {
              if (res) {
                console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold)
                if (res.affectedRows > 0) {
                  console.log('updated')
                  return resolve(res)
                }
              } else {
                console.log('err', err)
                return reject(new Error('Something went wrong', err))
              }
            })
          }
        }
      )
    }),

  sendForgotPasswordMail: async (user) =>
    await new Promise((resolve, reject) => {
      console.log('user email: ', user.email)

      // Email duplication check
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length === 0) {
              return reject(new Error('Email not registered'))
            } else {
              const userId = res[0]['id']
              const emailToken = jwt.sign(
                {
                  id: `${res.insertId}`,
                  sub: user.email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: '1h',
                }
              )
              const url = `http://localhost:${process.env.PORT}/user/${userId}/reset-password/${emailToken}`
              const transporter = nodemailer.createTransport({
                host: 'mail.codistan.pk',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: 'malik.mubashir@codistan.org',
                  pass: 'Mailk@Mubashir321',
                },
              })
              const mailOptions = {
                from: 'malik.mubashir@codistan.org', // sender address
                to: user.email, // list of receivers
                subject: 'Password reset Link', // Subject line
                html: `<p>${url}</p>`, // plain text body
              }
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err)
                  return reject(new Error('Something went wrong', err))
                } else {
                  con.query(
                    `UPDATE xana.users SET token = '${emailToken}' WHERE id=${userId} `,
                    (err, res) => {
                      if (err) {
                        console.log(err)
                        return reject(new Error('Something went wrong'))
                      } else {
                        console.log('info: ' + info)
                        return resolve(res)
                      }
                    }
                  )
                }
              })
            }
          } else {
            console.log(err)
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),

  resetPassword: async (userId, token, password) =>
    await new Promise((resolve, reject) => {
      console.log(password)
      con.query(
        `select * from xana.users where id='${userId}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            console.log(`${res[0]['token']}`.green)
            if (res.length === 0) {
              return reject(new Error(`User with id ${userId} not found`))
            } else {
              if (token === res[0]['token']) {
                const hashedPassword = await bcrypt.hash(password, 10)
                con.query(
                  `UPDATE xana.users SET password = '${hashedPassword}', token=null WHERE id=${userId}`,
                  (err, res) => {
                    if (res) {
                      console.log(res)
                      return resolve(res)
                    } else {
                      console.log(err)
                      return reject(
                        new Error(
                          'Something went wrong while updating password',
                          err
                        )
                      )
                    }
                  }
                )
              } else {
                console.log('Token Failed')
                return reject(new Error('Token Failed'))
              }
            }
          } else {
            console.log(err)
            return reject(new Error('Something went wrong', err))
          }
        }
      )
    }),
}

module.exports = userModel
