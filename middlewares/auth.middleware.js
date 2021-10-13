const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");
const { verifyJwt } = require("../helpers/jwt.helpers");
const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyJwt(token);
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
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: err,
    });
  }
};

module.exports = { verifyToken };
