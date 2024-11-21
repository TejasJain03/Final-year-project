const generateProfessionalResume = require("./professional_template/fillTemplate");
const generateGoogleResume = require("./google_template/fillTemplate");
const generateCollegeResume = require("./college_template/fillTemplate"); // Add this line for the college template
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
};

exports.create_college_template = async (resumeData) => {
  console.log("College template");
  
  // Generate the college resume PDF
  const pdfPath = await generateCollegeResume(resumeData);
  
  if (!pdfPath) throw new ExpressError(500, false, "Error creating college resume");

  // Get the filename from the PDF path
  // const fileName = path.basename(pdfPath);
  const fileName = "resume.pdf";
  
  
  if (!fileName) throw new ExpressError(500, false, "Error getting filename");

  // Return the PDF file name
  return fileName;
};