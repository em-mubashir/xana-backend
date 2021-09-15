const express = require("express");
const testRouter = express.Router();
const testModel = require("../models/test.model");
const auth = require("../middlewares/auth");
const { body, validationResult, errors } = require("express-validator");

testRouter.post(
  "/create-new",
  auth,
  [
    body("testName").not().isEmpty(),
    body("Manufacturer").not().isEmpty(),
    body("Description").not().isEmpty(),
    body("Performance").not().isEmpty(),
    body("Authorisation").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      console.log("create-new : >>> : req.user", req.user.id);
      testModel
        .addNew(req.body, req.user.id)
        .then((userObj) => {
          res.json({
            data: userObj,
            success: true,
            message: "Test Saved Successfully",
          });
        })
        .catch((err) => {
          console.log("add new test ::>> err", err);
          // console.log(sqlHelper.consoleSQLException(err))
          res.json({
            data: err,
            success: false,
            message: err.message,
          });
        });
    }
  }
);

module.exports = testRouter;
