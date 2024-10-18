const User = require("../models/users.model");
const ExpressError = require("../utils/ExpressError");
const { sendPremiumMail } = require("../utils/sendEmail");

exports.buyPremium = async (req, res) => {
    const { premiumType } = req.body;
    const user = await User.findById(req.user._id);
    if(!user) {
        throw new ExpressError(404, false, "User not found");
    }
    const {userName, email} = user;
    const info = await sendPremiumMail(userName, email, premiumType);
    if(!info) throw new ExpressError(500, false, "Error sending premium mail");
    
    res.status(200).json({
        success: true,
        message: "Email sent successfully"
    })
}   