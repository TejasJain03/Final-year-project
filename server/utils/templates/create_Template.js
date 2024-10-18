const generateProfessionalResume = require("./professional_template/fillTemplate");
const generateGoogleResume = require("./google_template/fillTemplate");
const ExpressError = require("../ExpressError");
const path = require("path");

exports.create_professional_template = async (resumeData) => {
  // Call the generateResume function
  console.log("Professional template");
  const pdfPath = await generateProfessionalResume(resumeData);
  if (!pdfPath) throw new ExpressError(500, false, "Error creating resume");

  // Get the filename from the path
  const fileName = path.basename(pdfPath);
  if (!fileName) throw new ExpressError(500, false, "Error getting filename");
  return fileName;
};

exports.create_google_template = async (resumeData) => {
  console.log("Google template");
  const pdfPath = await generateGoogleResume(resumeData);
  if (!pdfPath) throw new ExpressError(500, false, "Error creating resume");

  // Get the filename from the path
  const fileName = path.basename(pdfPath);
  if (!fileName) throw new ExpressError(500, false, "Error getting filename");
  return fileName;
 }