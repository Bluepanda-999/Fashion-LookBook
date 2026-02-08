const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res, next) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, bio, avatar, password } = req.body;

    const update = {};
    if (username) update.username = username;
    if (bio !== undefined) update.bio = bio;
    if (avatar !== undefined) update.avatar = avatar;

    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
