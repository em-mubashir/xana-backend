const ApiError = require("./api.error");

function apiErrorHanlder(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json("something went wrong");
}
module.exports = apiErrorHanlder;
