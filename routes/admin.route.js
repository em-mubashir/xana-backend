const express = require("express");
const adminRouter = express.Router();
const { body, validationResult, errors } = require("express-validator");

module.exports = adminRouter;
