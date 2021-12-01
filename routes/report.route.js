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
 * Add custom report
 * @returns reportObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/send-custom-report]
 */

reportRouter.post("/send-custom-report", async (req, res) => {
  try {
    console.log("req.body", req.body)
    const result = await reportModel.sendCustomReport(req.body);
    if (result) {
      res.json({
        data: result,
        success: true,
        message: "Email sent successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Email Invalid",
      });
    }
  } catch (error) {
    // throw new Error(error.message);
    return res.sendStatus(400)
  }

});

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
      })
      .catch((err) => {
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
      })
      .catch((err) => {
        res.json({
          data: err,
          success: false,
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
 * @route [http://192.168.18.14/api/reports/add-custom-report]
 */
reportRouter.post("/add-custom-report", async (req, res) => {
  try {
    const reportsObj = await reportModel.addCustomReport(req.body)
    if (reportsObj.affectedRows) {
      return res.json({
        data: reportsObj,
        success: true,
        message: "Report data inserted successfully",
      })
    }
    else {
      throw new Error("Failed to create report.")
    }

  }
  catch (err) {
    return res.sendStatus(400)
  }


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
      })
      .catch((error) => {
      });
    // reportModel
    //   .postReports(req.body)
    //   .then((userObj) => {
    //     res.json({
    //       data: userObj,
    //       success: true,
    //       message: "Report added successfully",
    //     });
    //   })
    //   .catch((err) => {
    //     res.json({
    //       data: err,
    //       success: false,
    //       message: err.message,
    //     });
    //   });
  }
);

module.exports = reportRouter;
