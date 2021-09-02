const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user.model");
const sqlHelper = require("../helpers/sqlHeplers");
const { body, validationResult, errors } = require("express-validator");

userRouter.post(
  "/register",
  [
    body("name").not().isEmpty(),
    body("password").not().isEmpty(),
    body("email").not().isEmpty(),
    body("mobile").not().isEmpty().isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .register(req.body)
        .then((userObj) => {
          res.json({
            data: userObj,
            success: true,
            message: "Admin inserted successfully",
          });
          console.log("register ::>> res", userObj);
        })
        .catch((err) => {
          console.log("register ::>> err", err);
          res.json({
            data: err,
            success: false,
            message: sqlHelper.consoleSQLException(err),
          });
        });
    }
  }
);

module.exports = userRouter;
