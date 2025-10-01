const { User } = require("../models/index");

const bcrypt = require("bcrypt");

const signToken = require("../utils/signToken");

exports.sessionsCreate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ error: "Email or password isn't provided", status: 0 });
      return;
    }
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "password"],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials", status: 0 });
      return;
    }

    const token = signToken(user.id);

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
