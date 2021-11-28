const express = require("express");
const testRouter = express.Router();
const FormData = require("form-data");
const fs = require("fs");
const testModel = require("../models/test.model");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const { verifyToken } = require("../middlewares/auth.middleware");

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
 * @route [http://192.168.0.107/api/reports/user]
 */
testRouter.post(
  "/create-new",
  verifyToken,
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
      testModel
        .addNew(req.body, req.user)
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
 * @route [http://192.168.0.107/api/reports/user]
 */
testRouter.put("/upload-test-image", upload.single("testImage"), (req, res) => {
  console.log(req);
  console.log(req.body);
  testModel
    .saveImage(req.body.img, req.body.testId)
    .then((fileObj) => {
      console.log("image stored ", fileObj);
      res
        .status(200)
        .send({ success: true, message: "Image uploaded successfully" });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err });
    });
});

/**
 * GET result of test
 * @retuns resultObj
 * @type GET
 * @required access_token
 * @route [http://192.168.18.14/api/test/result?id=1]
 */
testRouter.get("/result", async (req, res) => {
  console.log("req.query ::: ", req.query.id);
  let image =
    "http://192.168.0.107:5000/uploads/testImages/test-1636407520684_0_35.png";
  try {
    const { qr_id, test_image } = await testModel.getUserTestImg(req.query.id);
    console.log("res", qr_id, test_image);

    // const { results = "True" } = await axios.post(
    //   "http://192.168.0.107:5002/xana",
    //   {
    //     qr_id,
    //     test_image,
    //   }
    // );
    const results = "True";
    console.log("results", results);
    res
      .status(200)
      .send(await testModel.addReportResult(results, req.query.id));
    // if (res) {
    //   const obj = { id: res.qr_id, img: res.test_image };
    //   axios
    //     .post("http://192.168.0.107:5002/xana", obj)
    //     .then((response) => {
    //       console.log("response", response);
    //     })
    //     .catch((err) => {});
    // }
  } catch (e) {
    console.log("error", e);
  }
  // image = image.replace("http://192.168.0.107:5000/", "");
  // console.log("image ::: ", image);
  // const imagePath = path.join(__dirname, `../${image}`);
  // console.log(imagePath, "imagePath");
  // const data = fs.readFileSync(imagePath);
  // console.log(data, "data");
  // const fd = new FormData();
  // fd.append("id", req.query.id);

  // fd.append("img", image);
  // axios
  //   .post("http://192.168.0.107:5002/xana", fd)
  //   .then((res) => {
  //     console.log("res ::: ", res);
  //   })
  //   .catch((err) => {
  //     console.log("err::: ", err);
  //   });
});

module.exports = testRouter;
