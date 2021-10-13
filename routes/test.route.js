const express = require("express");
const testRouter = express.Router();
const testModel = require("../models/test.model");
const multer = require("multer");

const { body, validationResult, errors } = require("express-validator");
// multer file store start
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/testImages/");
  },
  filename(req, file, cb) {
    cb(null, `test-${Date.now()}${file.originalname}`);
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
 * @retuns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/user]
 */
testRouter.post(
  "/create-new",
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
/**
 * GET reports of user
 * @retuns reportsObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/reports/user]
 */
testRouter.put("/upload-test-image", upload.single("testImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body.testId);
  testModel
    .saveImage(req.file.path, req.body.testId)
    .then((fileObj) => {
      console.log("image stored ", fileObj);
      res
        .status(200)
        .send({ success: true, message: "Image stored successfully" });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err });
    });
});

module.exports = testRouter;
