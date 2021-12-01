const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");
const { verifyJwt, verifyEmailToken } = require("../helpers/jwt.helpers");
const config = process.env;

const verifyToken = (req, res, next) => {

  try {
    let token = "";
    let decoded = "";
    if (req.params.token) {
      token = req.params.token;
      decoded = verifyEmailToken(token);
    } else {
      token = req.headers.authorization.split(" ")[1];
      decoded = verifyJwt(token);
    }
    if (!decoded.payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid/Missing token",
        data: [],
      });
    } else {
      req.user = decoded.payload.payload;
      next();
    }
  } catch (err) {
    console.log(err.message)
    console.log(err.stack)
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: err,
    });
  }
};

module.exports = { verifyToken };
