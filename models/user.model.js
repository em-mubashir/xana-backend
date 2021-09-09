const con = require('../config/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')

const userModel = {
  register: (user) =>
    new Promise(async (resolve, reject) => {
      console.log('user', user)

      // Email duplication check
      con.query(
        `select * from xana.users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res.length !== 0) {
            return reject(new Error('Email already exists', err))
          } else {
            const hashedPassword = await bcrypt.hash(`${user.password}`, 10)
            let sql
            if (user.mobile) {
              sql = `INSERT into xana.users (name, email, mobile, password, roleId_fk) values ('${user.name}','${user.email}','${user.mobile}','${hashedPassword}',1)`
            } else {
              sql = `INSERT into xana.users (name, email, roleId_fk, image) values ('${user.name}','${user.email}',1, '${user.image}')`
            }
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

                  const url = `http://localhost:5112/api/user/confirmation/${emailToken}`
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
                    to: 'malikmubashir025@gmail.com', // list of receivers
                    subject: 'Subject of your email', // Subject line
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
        }
      )
    }),

  verifyEmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `Update xana.users set confirmed=1 where id='${user.id}'`,
        (err, res) => {
          if (res) {
            return resolve(res)
          } else {
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
          if (res.length !== 0) {
            const { password: hashedPassword } = res[0]
            const validPass = await bcrypt.compare(
              user.password,
              hashedPassword
            )
            if (validPass) {
              return resolve({ data: res, valid: true })
            } else {
              return reject({ data: res, valid: false, status: 500 })
            }
          } else {
            return reject(new Error('Email or Password is incorrect', err))
          }
        }
      )
    }),

  getProfile: (userId) =>
    new Promise((resolve, reject) => {
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
    }),
}

module.exports = userModel
