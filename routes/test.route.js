const express = require('express')
const testRouter = express.Router()
const { body, validationResult, errors } = require('express-validator')

module.exports = testRouter
