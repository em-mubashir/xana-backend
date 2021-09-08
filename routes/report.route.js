const express = require('express')
const reportRouter = express.Router()
const reportModel = require('../models/report.model')
const sqlHelper = require('../helpers/sqlHeplers')

reportRouter.get('/:email', (req, res) => {
  const email = req.params.email
  if (email) {
    reportModel
      .getAllReports(email)
      .then((reports) => {
        const message =
          reports.length > 0
            ? 'Reports fetched successfully'
            : 'No reports found'
        res.json({
          data: reports,
          success: true,
          message,
        })
        console.log('getReports ::>> res', reports)
      })
      .catch((err) => {
        console.log('getReports ::>> err', err)
        res.json({
          data: err,
          success: false,
          message: sqlHelper.consoleSQLException(err),
        })
      })
  }
})

reportRouter.get('/', (req, res) => {
  const email = req.query.email
  const orderId = req.query.orderId
  if (email && orderId) {
    reportModel
      .getReport(email, orderId)
      .then((report) => {
        const message =
          report.length > 0 ? 'Report fetched successfully' : 'No reports found'
        res.json({
          data: report,
          success: true,
          message,
        })
        console.log('getReport ::>> res', report)
      })
      .catch((err) => {
        console.log('getReport ::>> err', err)
        res.json({
          data: {},
          success: false,
          message: sqlHelper.consoleSQLException(err),
        })
      })
  } else {
    res.json({
      data: {},
      success: false,
      message: 'Missing Email or OrderId',
    })
  }
})

reportRouter.post('/', (req, res) => {
  reportModel
    .postReports(req.body)
    .then((userObj) => {
      res.json({
        data: userObj,
        success: true,
        message: 'Report added successfully',
      })
      console.log('postReports ::>> res', userObj)
    })
    .catch((err) => {
      console.log('postReports ::>> err ', err)
      res.json({
        data: err,
        success: false,
        message: err.message,
      })
    })
})

module.exports = reportRouter
