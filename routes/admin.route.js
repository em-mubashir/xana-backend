const express = require("express");
const adminRouter = express.Router();
const adminModel = require("../models/admin.model");
const { body, validationResult, errors } = require("express-validator");

adminRouter.get("/all-reports", (req, res) => {
  adminModel
    .getAllReports()
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Got all reports successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({ data: res, success: false, message: err });
    });
});

adminRouter.get("/report-detail/:id", (req, res) => {
  const reportId = req.params.id;
  adminModel
    .getReportDetail(reportId)
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Got report detail successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({ data: res, success: false, message: err });
    });
});

adminRouter.post(
  "/login",
  [body("password").not().isEmpty(), body("email").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      adminModel
        .adminLogin(req.body)
        .then((userObj) => {
          console.log("login ::>> res", userObj);
          res.json({
            data: userObj.data,
            success: true,
            message: "Admin logged in successfully",
          });
        })
        .catch((err) => {
          console.log("login ::>> err", err);
          if (err.valid === false) {
            console.log("false");
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              // message: sqlHelper.consoleSQLException(err),
              message: err.message,
            });
          }
        });
    }
  }
);

adminRouter.post(
  "/admin-singup",
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
      adminModel
        .adminSignup(req.body)
        .then((userObj) => {
          console.log("signup ::>> res", userObj);
          res.json({
            data: userObj.data,
            success: true,
            message: "Admin signed up  successfully",
          });
        })
        .catch((err) => {
          console.log("signup ::>> err", err);
          if (err.valid === false) {
            console.log("false");
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              // message: sqlHelper.consoleSQLException(err),
              message: err.message,
            });
          }
        });
    }
  }
);

module.exports = adminRouter;
