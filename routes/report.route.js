const express = require("express");
const reportRouter = express.Router();
const axios = require("axios");
const multer = require("multer");
const reportModel = require("../models/report.model");
const sqlHelper = require("../helpers/sqlHeplers");
const { verifyToken } = require("../middlewares/auth.middleware");

// multer file store start
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/reportImages/");
  },
  filename(req, file, cb) {
    cb(null, `report-${Date.now()}${file.originalname}.png`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file have different extension"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// multer file store ends

/**
 * GET reports of user
 * @returns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.62/api/reports/user]
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
 * @route [http://192.168.18.62/api/reports/user]
 */
reportRouter.get("/", verifyToken, (req, res) => {
  const userId = req.user;
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
 * Add custom report
 * @returns reportObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/admin/add-custom-report]
 */
reportRouter.post("/add-custom-report", (req, res) => {
  reportModel
    .addCustomReport(req.body)
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Report data inserted successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * GET reports of user
 * @returns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.62/api/reports/user]
 */
reportRouter.post(
  "/user/add-report",
  upload.single("reportImage"),
  (req, res) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id", "COV1080034ACONLFDAG00013014");
    bodyFormData.append(
      "img",
      "http://192.168.18.62:5000/reportImages/report-1635769362284_0_35.png"
    );
    axios
      .post({
        method: "post",
        url: "https://192.168.18.62:5002/xana",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        response.then((res) => console.log("res", res));
      })
      .catch((error) => {
        console.log(error);
      });
    // reportModel
    //   .postReports(req.body)
    //   .then((userObj) => {
    //     res.json({
    //       data: userObj,
    //       success: true,
    //       message: "Report added successfully",
    //     });
    //     console.log("postReports ::>> res", userObj);
    //   })
    //   .catch((err) => {
    //     console.log("postReports ::>> err ", err);
    //     res.json({
    //       data: err,
    //       success: false,
    //       message: err.message,
    //     });
    //   });
  }
);

module.exports = reportRouter;
