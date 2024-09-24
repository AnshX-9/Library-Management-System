const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const tokenVerifier = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(400).json({
      msg: "Please provide a token."
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token is invalid or expired.",
      error: error.message
    });
  }
};

module.exports = tokenVerifier;
