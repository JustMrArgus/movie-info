const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "User is not logged in", status: 0 });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      error: "The user belonging to this token does no longer exist.",
      status: 0,
    });
  }

  req.user = currentUser;

  next();
};
