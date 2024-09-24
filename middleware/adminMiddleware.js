
const validUserCheckMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.role === 'admin') {
      return next();
    }
  }
  catch (e) {
    res.status(404).json({
      msg: "Protected route !! Only admin are allowed "
    })
  }
}
module.exports = validUserCheckMiddleware;