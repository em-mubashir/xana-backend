const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/user.model')
const sqlHelper = require('../helpers/sqlHeplers')
const jwt = require('jsonwebtoken')
const { body, validationResult, errors } = require('express-validator')

userRouter.post(
  '/register/gmail',
  [body('name').not().isEmpty(), body('email').not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      userModel
        .register(req.body)
        .then((userObj) => {
          res.json({
            data: userObj,
            success: true,
            message: 'Admin inserted successfully',
          })
          console.log('register ::>> res', userObj)
        })
        .catch((err) => {
          console.log('register ::>> err', err)
          res.json({
            data: err,
            success: false,
            message: sqlHelper.consoleSQLException(err),
          })
        })
    }
  }
)

userRouter.post(
  '/register',
  [
    body('name').not().isEmpty(),
    body('password').not().isEmpty(),
    body('email').not().isEmpty(),
    body('mobile').not().isEmpty().isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      userModel
        .register(req.body)
        .then((userObj) => {
          res.json({
            data: userObj,
            success: true,
            message: 'Admin inserted successfully',
          })
          console.log('register ::>> res', userObj)
        })
        .catch((err) => {
          console.log('register ::>> err', err)
          res.json({
            data: err,
            success: false,
            message: sqlHelper.consoleSQLException(err),
          })
        })
    }
  }
)

userRouter.get('/confirmation/:token', async (req, res) => {
  try {
    const user = jwt.verify(req.params.token, 'xanaCoding')
    userModel
      .verifyEmail(user)
      .then((res) => {
        res.json({
          message: 'User verified successfully',
        })
      })
      .catch((err) => {
        res.json({
          error: err,
          message: 'User verified successfully',
        })
      })
  } catch (err) {
    res.json({ error: err })
  }
})

userRouter.post(
  '/login',
  [body('password').not().isEmpty(), body('email').not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      userModel
        .login(req.body)
        .then((userObj) => {
          console.log('register ::>> res', userObj)
          res.json({
            data: userObj,
            success: true,
            message: 'Admin logged in successfully',
          })
        })
        .catch((err) => {
          console.log('register ::>> err', err)
          if (err.valid === false) {
            console.log('false')
            res.json({
              success: false,
              message: 'Password is incorrect',
            })
          } else {
            res.json({
              data: err,
              success: false,
              message: sqlHelper.consoleSQLException(err),
            })
          }
        })
    }
  }
)

module.exports = userRouter
