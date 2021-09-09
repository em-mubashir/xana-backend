const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/user.model')
// const sqlHelper = require('../helpers/sqlHeplers')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

// POST /api/user/register/gmail
userRouter.post(
  '/register/gmail',
  [
    body('name').not().isEmpty(),
    body('email').not().isEmpty(),
    body('image').not().isEmpty(),
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
            message: 'User added successfully',
          })
          console.log('register ::>> res', userObj)
        })
        .catch((err) => {
          console.log('register ::>> err', err)
          res.status(400).json({
            data: err,
            success: false,
            message: err.message,
          })
        })
    }
  }
)

// POST /api/user/register
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
          // console.log(sqlHelper.consoleSQLException(err))
          res.json({
            data: err,
            success: false,
            message: err.message,
          })
        })
    }
  }
)

// GET /api/user/confirmation/:token
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

// POST /api/user/login
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
            data: userObj.data,
            success: true,
            message: 'User logged in successfully',
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
              // message: sqlHelper.consoleSQLException(err),
              message: err.message,
            })
          }
        })
    }
  }
)

// GET /api/user/profile/:id
userRouter.get('/profile/:id', (req, res) => {
  userModel
    .getProfile(req.params.id)
    .then((userObj) => {
      console.log('getProfile ::>> res', userObj)
      res.json({
        data: userObj,
        success: true,
        message: 'User Profile Fetched successfully',
      })
    })
    .catch((err) => {
      console.log('getProfile ::>> err', err)
      res.json({
        data: err,
        success: false,
        // message: sqlHelper.consoleSQLException(err),
        message: err.message,
      })
    })
})

// PUT /api/user/profile/:id/edit
userRouter.put('/profile/:id/edit', (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  } else {
    userModel
      .updateProfile(req.params.id, req.body)
      .then((userObj) => {
        res.json({
          data: userObj,
          success: true,
          message: 'User updated successfully',
        })
        console.log('UpdateProfile ::>> res', userObj)
      })
      .catch((err) => {
        console.log('UpdateProfile ::>> err', err)
        // console.log(sqlHelper.consoleSQLException(err))
        res.json({
          data: err,
          success: false,
          message: err.message,
        })
      })
  }
})

module.exports = userRouter
