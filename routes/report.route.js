const express = require("express");
const reportRouter = express.Router();
const reportModel = require("../models/report.model");
const sqlHelper = require("../helpers/sqlHeplers");
const { verifyToken } = require("../middlewares/auth.middleware");

/**
 * GET reports of user
 * @returns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/user]
 */
reportRouter.get("/user", verifyToken, (req, res) => {
  const userId = req.user;
  if (userId) {
    reportModel
      .getAllReports(userId)
      .then((reports) => {
        const message =
          reports.length > 0
            ? "Reports fetched successfully"
            : "No reports found";
        res.json({
          data: reports,
          success: true,
          message,
        });
        console.log("getReports ::>> res", reports);
      })
      .catch((err) => {
        console.log("getReports ::>> err", err);
        res.json({
          data: err,
          success: false,
          message: err.message,
        });
      });
  }
});

/// work to fix
/**
 * GET reports of user
 * @returns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/user]
 */
reportRouter.get("/", (req, res) => {
  const userId = req.query.userId;
  const orderId = req.query.orderId;
  if (userId && orderId) {
    reportModel
      .getReport(userId, orderId)
      .then((report) => {
        const message =
          report.length > 0
            ? "Report fetched successfully"
            : "No reports found";
        res.json({
          data: report,
          success: true,
          message,
        });
        console.log("getReport ::>> res", report);
      })
      .catch((err) => {
        console.log("getReport ::>> err", err);
        res.json({
          data: err,
          success: false,
          message: sqlHelper.consoleSQLException(err),
        });
      });
  } else {
    res.json({
      data: {},
      success: false,
      message: "Missing Email or OrderId",
    });
  }
});

/**
 * GET reports of user
 * @returns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/user]
 */
reportRouter.post("/user/add-report", (req, res) => {
  reportModel
    .postReports(req.body)
    .then((userObj) => {
      res.json({
        data: userObj,
        success: true,
        message: "Report added successfully",
      });
      console.log("postReports ::>> res", userObj);
    })
    .catch((err) => {
      console.log("postReports ::>> err ", err);
      res.json({
        data: err,
        success: false,
        message: err.message,
      });
    });
});

module.exports = reportRouter;
