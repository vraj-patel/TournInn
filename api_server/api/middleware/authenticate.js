const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : require('../../nodemon.json').env.AUTH_TOKEN;
    jwtKey = process.env.JWT_KEY || require('../../nodemon.json').env.JWT_KEY

    const decoded = jwt.verify(token, jwtKey);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
