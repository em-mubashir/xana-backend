const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");
const { verifyJwt } = require("../helpers/jwt.helpers");
const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    let token = "";
    let decoded = "";
    if (req.params.token) {
      console.log("in url");
      token = req.params.token;
      decoded = jwt.verify(token, config.JWT_KEY);
    } else {
      console.log("elseee");
      token = req.headers.authorization.split(" ")[1];
      decoded = verifyJwt(token);
    }

    console.log("token :: ", token);

    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid/Missing token",
        data: [],
      });
    } else {
      req.user = decoded;
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
