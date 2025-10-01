const { User } = require("../models/index");

const signToken = require("../utils/signToken");

exports.usersCreate = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = signToken(newUser.id);

    res.status(200).json({
      token,
      status: 1,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 0,
    });
  }
};
