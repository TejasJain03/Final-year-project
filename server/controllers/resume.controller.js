const generateResume = require('../utils/templates/fillTemplate');
const path = require('path');


exports.createResume = async (req, res) => {
  try {
    // Extract resume data from request body
    const resumeData = req.body;

    // Call the generateResume function
    const pdfPath = await generateResume(resumeData);

    // Get the filename from the path
    const fileName = path.basename(pdfPath);

    // Send the PDF file as a download
    res.status(200).json({status: 'success', fileName, message: 'Resume created successfully'});

  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error: error.message });
  }
};

// ... other controller functions ...
