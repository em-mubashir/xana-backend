const express = require("express");
const adminRouter = express.Router();
const adminModel = require("../models/admin.model");
const { body, validationResult, errors } = require("express-validator");
const { verifyToken } = require("../middlewares/auth.middleware");

/**
 * Get All Reports
 * @retuns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.0.107/api/admin/all-reports]
 */
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
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Get All users
 * @returns adminObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/admin/all-reports]
 */
adminRouter.get("/all-users", (req, res) => {
  adminModel
    .getAllUsers()
    .then((adminObj) => {
      res.json({
        data: adminObj,
        success: true,
        message: "User data fetch successfully",
      });
    })
    .catch((err) => {
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Get All test
 * @returns testObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/admin/all-reports]
 */
adminRouter.get("/test", verifyToken, (req, res) => {
  adminModel
    .getAllTest()
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Got all test successfully",
      });
    })
    .catch((err) => {
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Get All test
 * @returns testObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/admin/all-reports]
 */
adminRouter.get("/customreport", verifyToken, (req, res) => {
  adminModel
    .getAllCustomReport()
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Got all custom reports successfully",
      });
    })
    .catch((err) => {
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Add custom report
 * @returns reportObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/admin/add-custom-report]
 */
adminRouter.post("/add-custom-report", (req, res) => {
  adminModel
    .addCustomReport(req.body)
    .then((reportsObj) => {
      res.json({
        data: reportsObj,
        success: true,
        message: "Report data inserted successfully",
      });
    })
    .catch((err) => {
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Forgot password
 * @type GET
 * @retuns reportsObj
 * @required access_token
 * @route [http://192.168.0.107/api/admin/report-detail/:id]
 */
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
      res.json({ data: res, success: false, message: err });
    });
});

/**
 * Admin Login
 * @type POST
 * @retuns userObj
 * @params password,email
 * @route [http://192.168.0.107/api/admin/login]
 */
adminRouter.post(
  "/login",
  [body("password").not().isEmpty(), body("email").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      adminModel
        .adminLogin(req.body)
        .then((userObj) => {
          res.json({
            data: userObj.data,
            payload: userObj.payload,
            success: true,
            message: "Admin logged in successfully",
          });
        })
        .catch((err) => {
          if (err.valid === false) {
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              message: err.message,
            });
          }
        });
    }
  }
);

/**
 * Admin Signup
 * @type POST
 * @retuns reportsObj
 * @params name,password,email,mobile
 * @route [http://192.168.0.107/api/admin/admin-singup]
 */
adminRouter.post(
  "/admin-signup",
  [
    body("fname").not().isEmpty(),
    body("lname").not().isEmpty(),
    body("email").not().isEmpty(),
    body("mobile").not().isEmpty().isNumeric(),
    body("password").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      adminModel
        .adminSignup(req.body)
        .then((userObj) => {
          res.json({
            data: userObj.data,
            success: true,
            message: "Admin signed up successfully",
          });
        })
        .catch((err) => {
          if (err.valid === false) {
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              message: err.message,
            });
          }
        });
    }
  }
);

/**
 * Update report status
 * @type PUT
 * @retuns reportsObj
 * @params status,id
 * @required accessToken
 * @route [http://192.168.0.107/api/admin/update-report-status]
 */
adminRouter.put(
  "/update-report-status",
  [body("result").not().isEmpty(), body("id").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      adminModel
        .updateReportStatus(req.body)
        .then((reportsObj) => {
          res.json({
            data: reportsObj.data,
            success: true,
            message: "Test Result Status Updated Successfully",
          });
        })
        .catch((err) => {
          if (err.valid === false) {
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              message: err.message,
            });
          }
        });
    }
  }
);

/**
 * Update report status
 * @type PUT
 * @retuns reportsObj
 * @params status,id
 * @required accessToken
 * @route [http://192.168.0.107/api/admin/update-report-status]
 */
adminRouter.put(
  "/update-custom-report-status",
  [body("result").not().isEmpty(), body("id").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      adminModel
        .updateCustomReportStatus(req.body)
        .then((reportsObj) => {
          res.json({
            data: reportsObj.data,
            success: true,
            message: "Custom Report Status Updated Successfully",
          });
        })
        .catch((err) => {
          if (err.valid === false) {
            res.json({
              success: false,
              message: err.message,
            });
          } else {
            res.json({
              data: err,
              success: false,
              message: err.message,
            });
          }
        });
    }
  }
);

/**
 * Generate Qr Code
 * @type POST
 * @retuns Obj
 * @required accessToken
//  * @params status,id
 * @route [http://192.168.0.107/api/admin/generate-qr]
 */
adminRouter.post("/generate-qr", (req, res) => {
  adminModel
    .generateQr(req.body)
    .then((userObj) => {
      res.json({
        data: userObj.data,
        success: true,
        message: "Qr Codes Generated successfully",
      });
    })
    .catch((err) => {
      if (err.valid === false) {
        res.json({
          success: false,
          message: err.message,
        });
      } else {
        res.json({
          data: err,
          success: false,
          message: err.message,
        });
      }
    });
});

module.exports = adminRouter;
