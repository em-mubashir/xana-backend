const express = require('express');
const testRouter = express.Router();
const FormData = require('form-data');
const fs = require('fs');
const testModel = require('../models/test.model');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { verifyToken } = require('../middlewares/auth.middleware');

const { body, validationResult, errors } = require('express-validator');
// multer file store start
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/testImages/');
  },
  filename(req, file, cb) {
    cb(null, `test-${Date.now()}${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('file have different extension'), false);
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
 * @route [http://192.168.18.62/api/reports/user]
 */
testRouter.post(
  '/create-new',
  verifyToken,
  [
    body('testName').not().isEmpty(),
    body('Manufacturer').not().isEmpty(),
    body('Description').not().isEmpty(),
    body('Performance').not().isEmpty(),
    body('Authorisation').not().isEmpty(),
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
            message: 'Test Saved Successfully',
          });
        })
        .catch((err) => {
          console.log('add new test ::>> err', err);
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
 * @route [http://192.168.18.62/api/reports/user]
 */
testRouter.put('/upload-test-image', (req, res) => {
  console.log(req);
  console.log(req.body);
  testModel
    .saveImage(req.body.img, req.body.testId)
    .then((fileObj) => {
      console.log('image stored ', fileObj);
      res
        .status(200)
        .send({ success: true, message: 'Image uploaded successfully' });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err });
    });
});

testRouter.put('/upload-test-report-url', (req, res) => {
  testModel
    .reportURL(req.body.link, req.body.testId)
    .then((fileObj) => {
      console.log('image stored ', fileObj);
      res
        .status(200)
        .send({ success: true, message: 'link uploaded successfully' });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err });
    });
});

testRouter.put('/upload-custom-report-url', (req, res) => {
  testModel
    .customReportURL(req.body.link, req.body.testId)
    .then((fileObj) => {
      console.log('image stored ', fileObj);
      res
        .status(200)
        .send({ success: true, message: 'link uploaded successfully' });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err });
    });
});

testRouter.put('/upload-test-video', (req, res) => {
  console.log(req);
  console.log(req.body);
  testModel
    .saveVideo(req.body.video, req.body.testId)
    .then((fileObj) => {
      console.log('Video stored ', fileObj);
      res
        .status(200)
        .send({ success: true, message: 'Video uploaded successfully' });
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
testRouter.get('/result', async (req, res) => {
  // console.log('req.query ::: ', req.query.id);
  try {
    const { qr_id, test_image } = await testModel.getUserTestImg(req.query.id);
    var data = JSON.stringify({
      qr_id: qr_id,
      img: test_image,
      test_id: req.query.id,
      test_type: 0,
    });
    var config = {
      method: 'post',
      url: process.env.IMAGE_DECTECTION + '/get_test_result',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const results1 = await axios(config)
      .then(async function (response) {
        console.log('response are here', response);

        const { results } = response.data;
        console.log('results are here', results);
        if (results) {
          await testModel.addReportResult(results, req.query.id);

          var dataReportURL = JSON.stringify({
            test_id: req.query.id,
            test_type: 0,
          });
          var configReport = {
            method: 'post',
            url: process.env.IMAGE_DECTECTION + '/get_test_report',
            headers: {
              'Content-Type': 'application/json',
            },
            data: dataReportURL,
          };
          const results2 = await axios(configReport)
            .then(async function (response) {
              console.log('result hhjcsdjbcskcs', response.data);
              if (response.data) {
                await testModel.reportURL(response.data, req.query.id);
              }
            })
            .catch(function (error) {
              console.log('inner catch result', response.data);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log('error', e);
  }
});

module.exports = testRouter;
