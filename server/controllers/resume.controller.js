const ExpressError = require("../utils/ExpressError");
const { sendResumeMail } = require("../utils/sendEmail");
const path = require("path");
const User = require("../models/users.model");
const {
  create_professional_template,
  create_college_template,
  create_google_template,
} = require("../utils/templates/create_Template");
const Info = require("../models/info.model");

exports.createResume = async (req, res) => {
  try {
    // Extract resume data from request body
    let resumeData = req.body;
    const template = req.body.template;

    // Check if a file is uploaded
      
  const user = await User.findById(req.user._id).select("userName email");
  if (!user) throw new ExpressError(404, false, "User not found");

  const info = await Info.findOne({userId: req.user._id}).select("-userId -_id");
  if(!info) throw new ExpressError(404, false, "Info not found");

  // Add all fields from info to resumeData
  Object.assign(resumeData, info.toObject());
  Object.assign(resumeData, user.toObject());
  
  console.log(resumeData);

    const selected_template = {
      1: () => create_professional_template(resumeData),
      2: () => create_google_template(resumeData),
      3: () => create_college_template(resumeData),
    };
    const fileName = await selected_template[template]();

    // Send the PDF file as a download
    res.status(200).json({
      status: "success",
      fileName,
      message: "Resume created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the resume",
      error: error.message,
    });
  }
};
exports.sendResume = async (req, res) => {
  const template = req.body.template;

  const selected_template = {
    1: "professional_template",
    2: "google_template",
  };

  const user = await User.findById(req.user._id);
  if (!user) throw new ExpressError(404, false, "User not found");

  // const { email, userName } = user;
  const { email, userName } = req.body;

  // Send the resume email
  const info = await sendResumeMail(
    userName,
    email,
    selected_template[template]
  );
  if (!info) throw new ExpressError(500, false, "Error sending resume");

  // Delete the resume PDF file
  const fs = require("fs").promises;
  const pdfPath = path.join(
    __dirname,
    "..",
    "utils",
    "templates",
    selected_template[template],
    "resume.pdf"
  );
  console.log(pdfPath);
  await fs.unlink(pdfPath);

  res
    .status(200)
    .json({ status: "success", message: "Resume has been sent to your email" });
};
