const ExpressError = require('../utils/ExpressError');
const { sendResumeMail } = require('../utils/sendEmail');
const generateResume = require('../utils/templates/fillTemplate');
const path = require('path');
const User = require('../models/user.model');

exports.createResume = async (req, res) => {
    // Extract resume data from request body
    const resumeData = req.body;

    // Call the generateResume function
    const pdfPath = await generateResume(resumeData);
    if(!pdfPath) throw new ExpressError(500, false, "Error creating resume");

    // Get the filename from the path
    const fileName = path.basename(pdfPath);
    if(!fileName) throw new ExpressError(500, false, "Error getting filename");

    // Send the PDF file as a download
    res.status(200).json({status: 'success', fileName, message: 'Resume created successfully'});
};

exports.sendResume = async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) throw new ExpressError(404, false, "User not found");

  const {userEmail, userName} = user;

    // Send the resume email
    const info = await sendResumeMail(userName, userEmail);
    if(!info) throw new ExpressError(500, false, "Error sending resume");

    // Delete the resume PDF file
    const fs = require('fs').promises;
    const pdfPath = path.join(__dirname, '..', 'utils', 'templates', "resume.pdf");
    const deleted = await fs.unlink(pdfPath);
    if(!deleted) throw new ExpressError(500, false, "Error deleting resume");

    res.status(200).json({status: 'success', message: 'Resume has been sent to your email'});
};
