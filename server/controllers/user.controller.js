const User = require("../models/users.model");
const { ExpressError } = require("../utils/ExpressError");
const Info = require("../models/info.model");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) throw new ExpressError(404, false, "User not found");
    const userInfo = await Info.findOne({ userId: req.user._id }).select("-userId");
    user.info = userInfo;
    res.status(200).json({
      success: true,
      user,
      message: "User fetched successfully",
    });
  } catch (error) {
    throw new ExpressError(400, false, error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { city, state, country, phoneNumber, linkedin, github, domain } = req.body;
    
    // Update or create Info model
    let userInfo = await Info.findOne({ userId: req.user._id });
    
    if (userInfo) {
      userInfo = await Info.findOneAndUpdate(
        { userId: req.user._id },
        { city, state, country, phoneNumber, linkedin, github, domain },
        { new: true, runValidators: true }
      );
    } else {
      userInfo = new Info({
        userId: req.user._id,
        city,
        state,
        country,
        phoneNumber,
        linkedin,
        github,
        domain
      });
      await userInfo.save();
    }

    res.status(200).json({
      success: true,
      userInfo,
      message: "User information updated successfully",
    });
  } catch (error) {
    throw new ExpressError(400, false, error.message);
  }
};
