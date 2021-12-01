const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const multer = require("multer");
const userModel = require("../models/user.model");
const sessionModel = require("../models/session.model");
const { verifyRefreshToken } = require("../helpers/jwt.helpers");
const { verifyToken } = require("../middlewares/auth.middleware");
// const sqlHelper = require('../helpers/sqlHeplers')
const jwt = require("jsonwebtoken");
const { body, param, validationResult } = require("express-validator");

// multer file store start
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/profileImages/");
  },
  filename(req, file, cb) {
    cb(null, `test-${Date.now()}${file.originalname}.png`);
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

userRouter.post("/getreporturl", (req, res) => {
  userModel
    .getReportUrl(
      req.body.userId,
      req.body.testId,
      req.body.QrId,
      req.body.Result
    )
    .then((repObj) => {
      res.json({
        data: repObj,
        success: true,
        message: "Report Testing URL Generated",
      });
    })
    .catch((err) => {
      console.log("Get report url ::>> err", err);
      res.json({
        data: err,
        success: false,
        message: err.message,
      });
    });
});

/**
 * Register User
 * @returns userObj
 * @type POST
 * @params firstName,lastName,password,email,mobile
 * @route [http://192.168.18.62/api/user/register]
 */
userRouter.post(
  "/register",
  [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
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
            message:
              "A verification link has been sent to your email. Please verify your account in order to login",
          });
          console.log("register ::>> res", userObj);
        })
        .catch((err) => {
          console.log("register ::>> err", err);
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

/**
 * Register Gmail
 * @returns userObj
 * @type POST
 * @params firstName,lastName, email
 * @route [http://192.168.18.62/api/user/register/gmail]
 */
userRouter.post(
  "/register/gmail",
  [
    body("firstName").not().isEmpty(),
    body("lastName").not().isEmpty(),
    body("email").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .registerGmail(req.body)
        .then((userObj) => {
          console.log("userObj: ", userObj);
          res.json({
            data: userObj,
            success: true,
            message: "User inserted successfully",
          });
        })
        .catch((err) => {
          console.log("register ::>> err", err);
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

/**
 * Token Verification
 * @returns success
 * @type GET
 * @route [http://192.168.18.62/api/user/confirmation/:token]
 */
userRouter.get("/confirmation/:token", verifyToken, async (req, res) => {
  try {
    userModel
      .verifyEmail(req.user)
      .then(() => {
        res.json({
          success: true,
          message: "User verified successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          error: err,
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

/**
 * Login
 * @returns userId, sessionId, accessToken, refreshToken
 * @type POST
 * @params password,email
 * @route [http://192.168.18.62/api/user/login]
 */
userRouter.post(
  "/login",
  [body("password").not().isEmpty(), body("email").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .login(req.body)
        .then(async (payload) => {
          console.log("login ::>> res", payload);
          res.json({
            data: payload.userId,
            sessionId: payload.sessionId,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            success: true,
            message: "User logged in successfully",
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

/**
 * Logout
 * @returns success
 * @type POST
 * @route [http://192.168.18.62/api/user/logout]
 */
userRouter.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Bad Request");
    const verifiedToken = await verifyRefreshToken(refreshToken);
    await sessionModel.invalidateSession(verifiedToken.payload.userId);
    res.json({
      success: true,
      message: "User logged out successfully",
    });
    // delete from db
  } catch (err) {
    res.json({
      data: err,
      success: false,
      message: "Something went wrong",
    });
  }
});

/**
 * Login with gmail
 * @returns userObj
 * @type POST
 * @route [http://192.168.18.62/api/user/login/gmail]
 */
userRouter.post("/login/gmail", [body("email").not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    userModel
      .loginGmail(req.body)
      .then((userObj) => {
        console.log("login ::>> res", userObj);
        res.json({
          data: userObj,
          success: true,
          message: "User logged in successfully",
        });
      })
      .catch((err) => {
        console.log("login ::>> err", err);
        if (err.valid === false) {
          console.log("false");
          res.json({
            success: false,
            message: "Email or Password is incorrect",
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
});

/**
 * Edit Profile
 * @returns userObj
 * @type get
 * @required access_token
 * @route [http://192.168.18.62/api/user/profile]
 */
userRouter.get(
  "/profile",
  verifyToken,

  (req, res) => {
    console.log("req", req.user);
    userModel
      .getProfile(req.user)
      .then((userObj) => {
        console.log("getProfile ::>> res", userObj);
        res.json({
          data: userObj,
          success: true,
          message: "User Profile Fetched successfully",
        });
      })
      .catch((err) => {
        console.log("getProfile ::>> err", err);
        res.json({
          data: err,
          success: false,
          // message: sqlHelper.consoleSQLException(err),
          message: err.message,
        });
      });
  }
);

/**
 * Edit Profile
 * @returns userObj
 * @type put
 * @params first_name
 * @required access_token
 * @route [http://192.168.18.62/api/user/profile/edit]
 */
userRouter.put(
  "/profile/edit",
  verifyToken,
  upload.single("profileImage"),
  (req, res) => {
    console.log("in i dont know ");
    // console.log(upload.single("profileImage"));
    // console.log(req);
    userModel
      .updateProfile(req.user, req.body, req.file)
      .then((userObj) => {
        console.log("in updATE PROFILE");

        res.json({
          success: true,
          message: "User updated successfully",
        });
        console.log("UpdateProfile ::>> res", userObj);
      })
      .catch((err) => {
        console.log("IN PROFILE UPDATE ASDASDASDSAD");
        console.log("UpdateProfile ::>> err", err);
        // console.log(sqlHelper.consoleSQLException(err))
        res.json({
          data: err,
          success: false,
          message: err.message,
        });
      });
  }
);

/**
 * Forgot password
 * @returns success
 * @type post
 * @params email
 * @required access_token
 * @route [http://192.168.18.62/api/user/forgot-password]
 */
userRouter.post(
  "/forgot-password",
  [body("email").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .sendForgotPasswordMail(req.body)
        .then((userObj) => {
          res.json({
            success: true,
            message: "Password reset email sent successfully",
          });
          // console.log("Password Reset ::>> res", userObj);
        })
        .catch((err) => {
          console.log("Password Reset ::>> err", err);
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

/**
 * Reset Password
 * @returns userId
 * @type get
 * @route [http://192.168.18.62/api/user/reset-password/:token]
 */
userRouter.get("/reset-password/:token", async (req, res) => {
  userModel
    .resetPasswordVerify(req.params.token)
    .then((userObj) => {
      //  console.log("userObj : resetPassword :>> ", userObj);
      res.json({
        success: true,
        data: userObj[0].id,
        message: "Code Verified Successfully",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
        message: err.message,
      });
    });
});

/**
 * Resend Code
 * @type post
 * @returns success
 * @params email
 * @route [http://192.168.18.62/api/user/resend-code]
 */
userRouter.post("/resend-code", async (req, res) => {
  userModel
    .resendCode(req.body.email)
    .then((userObj) => {
      //  console.log("Code sent res :>> ", userObj);
      res.json({
        success: true,
        // data: userObj,
        message: "Code sent successfully",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
        message: err.message,
      });
    });
});

/**
 * Refresh Token
 * @type post
 * @returns accessToken, refreshToken
 * @params refreshToken
 * @route [http://192.168.18.62/api/user/refresh-token]
 */
userRouter.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Bad Request");
    const token = await verifyRefreshToken(refreshToken);
    if (token.payload.accessToken && token.payload.refreshToken) {
      res.status(200).json({
        accessToken: token.payload.accessToken,
        refreshToken: token.payload.refreshToken,
      });
    } else {
      res.json({
        success: false,
        data: {},
        message: "Invalid refresh token",
      });
    }
  } catch (err) {
    res.status(500).json({ data: err, message: "Invalid/Expired token" });
  }
});

/**
 * Update Password
 * @type put
 * @returns success
 * @params id,password
 * @route [http://192.168.18.62/api/user/update-password]
 */
userRouter.put("/update-password", async (req, res) => {
  userModel
    .updatePassword(req.body.password, req.body.id)
    .then((updatedPassword) => {
      // console.log("updated password", updatedPassword);
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({
        success: false,
        error: err,
        message: err.message,
      });
    });
});

/**
 * Get Test
 * @type get
 * @returns data
 * @route [http://192.168.18.14/api/user/test]
 */
userRouter.get("/test", verifyToken, async (req, res) => {
  // console.log("test");

  userModel
    .getUserTest(req.user)
    .then((testObj) => {
      //   console.log("updated password", testObj);
      res.status(200).json({
        success: true,
        data: testObj,
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({
        success: false,
        error: err,
        message: err.message,
      });
    });
});
module.exports = userRouter;
