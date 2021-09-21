const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user.model");
const auth = require("../middlewares/auth");
// const sqlHelper = require('../helpers/sqlHeplers')
const jwt = require("jsonwebtoken");
const { body, param, validationResult } = require("express-validator");

// POST /api/user/register
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
            message: "User inserted successfully",
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

// POST /api/user/register
userRouter.post(
  "/register/gmail",
  [body("name").not().isEmpty(), body("email").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .registerGmail(req.body)
        .then((userObj) => {
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

// GET /api/user/confirmation/:token
userRouter.get("/confirmation/:token", auth, async (req, res) => {
  try {
    userModel
      .verifyEmail(req.user)
      .then(() => {
        res.status(301).redirect("xanamedtech://chat/Eri");
        // res.json({
        //   success: true,
        //   message: "User verified successfully",
        // });
      })
      .catch((err) => {
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

// POST /api/user/login
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
        .then((userObj) => {
          console.log("login ::>> res", userObj);
          res.json({
            data: userObj.data,
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

// POST /api/user/login/gmail
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
          data: userObj.data,
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

// GET /api/user/profile/:id
userRouter.get("/profile/:id", (req, res) => {
  userModel
    .getProfile(req.params.id)
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
});

// PUT /api/user/profile/:id/edit
userRouter.put(
  "/profile/:id/edit",
  [body("name").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .updateProfile(req.params.id, req.body)
        .then((userObj) => {
          res.json({
            data: userObj,
            success: true,
            message: "User updated successfully",
          });
          console.log("UpdateProfile ::>> res", userObj);
        })
        .catch((err) => {
          console.log("UpdateProfile ::>> err", err);
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
          console.log("Password Reset ::>> res", userObj);
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

// POST /api/user/:id/reset-password
userRouter.get("/reset-password/:token", auth, async (req, res) => {
  userModel
    .resetPasswordVerify(req.user, req.params.token, req.body.password)
    .then((userObj) => {
      console.log("userObj : resetPassword :>> ", userObj);
      res.status(301).redirect("xanamedtech://chat/Eri?id=" + req.user.id);
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
        message: err.message,
      });
    });
});

// POST /api/user/refresh-token

userRouter.post("/refresh-token", async (req, res) => {
  userModel
    .refreshToken(req.body.id)
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      console.log("error", err);
    });
});

userRouter.put("/update-password", async (req, res) => {
  userModel
    .updatePassword(req.body.password, req.body.id)
    .then((updatedPassword) => {
      console.log("updated password", updatedPassword);
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
});
module.exports = userRouter;
