const User = require("../models/users.model");
const { ExpressError } = require("../utils/ExpressError");
const Info = require("../models/info.model");

exports.getUser = async (req, res) => {
    let user = await User.findById(req.user._id).select("-password").lean();
    if (!user) throw new ExpressError(404, false, "User not found");
    const userInfo = await Info.findOne({ userId: req.user._id }).select("-userId");
    // user.info = userInfo;
    user = {...user, info: userInfo};
    res.status(200).json({
      success: true,
      user,
      message: "User fetched successfully",
    });
};

exports.updateUser = async (req, res) => {
    const { city, state, country, phoneNumber, linkedin, github, domain } = req.body;
    
    // Update or create Info model
    let userInfo = await Info.findOne({ userId: req.user._id });
    
    if (userInfo) {
      userInfo = await Info.findOneAndUpdate(
        { userId: req.user._id },
        { city, state, country, phoneNumber, linkedin, github, domain },
        { new: true, runValidators: true }
      ).select("-userId");
    }
    console.log(userInfo);
    res.status(200).json({
      success: true,
      userInfo,
      message: "User information updated successfully",
    });
};
