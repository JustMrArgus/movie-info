const { User } = require("../models/index");

const signToken = require("../utils/signToken");

exports.usersCreate = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({
        error: "The user is already exists",
        status: 0,
      });
    }

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
