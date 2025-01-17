const ExpressError = require("../utils/ExpressError");
const { sendResumeMail } = require("../utils/sendEmail");
const path = require("path");
const User = require("../models/users.model");
const Payment = require("../models/payment.model");
const {
  create_professional_template,
  create_google_template,
  create_college_template,
  create_mba_tempalte,
} = require("../utils/templates/create_Template");
const axios = require("axios"); // Ensure Axios is installed for making API requests

async function geminiFunction(data) {
  const prompt = `You are an expert in creating ATS-friendly resumes. Please process the following resume data and make it fully compliant with ATS standards, optimized for the role specified. Ensure the following:

1. Highlight modern and in-demand skills by enclosing them in strong HTML Tags (e.g.,   <strong>JavaScript</strong>, <strong>React</strong>).  
2. Use concise and impactful language while preserving the structure and formatting of the input JSON.  
3. Incorporate role-specific keywords that are relevant to modern technologies, frameworks, methodologies, and tools (e.g., Agile, DevOps, CI/CD, etc., for software roles, or specific tools for other roles like marketing or data analytics).  
4.Ensure that each paragraph contains exactly 40 words. If a paragraph is shorter, expand it with role-relevant details while maintaining accuracy and professionalism. For paragraphs exceeding 40 words, retain their original word count without reduction of words.
5. Do not include any text or explanation outside of the updated JSON object.  
6. Retain the exact structure of the input JSON for seamless integration.  
7. Tailor the content to align with the responsibilities, skills, and expectations of the role sent in the request.  

Here is the role-specific ATS optimization for the resume:  

Role: ${data.role}  

Resume Data:  
${JSON.stringify(data)} `;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const geminiRequestPayload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };
  const geminiResponse = await axios.post(geminiApiUrl, geminiRequestPayload, {
    headers: { "Content-Type": "application/json" },
    timeout: 60000, // 1 minute timeout
  });
  const responseText =
    geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    return res.status(500).json({
      status: "error",
      message: "Gemini API returned no valid content.",
    });
  }
  const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
  const atsFriendlyResumeData = JSON.parse(cleanedResponse);
  return atsFriendlyResumeData;
}
exports.createResume = async (req, res) => {
  try {
    const { template, profilePicture, ...resumeData } = req.body;
    // console.log (resumeData);

    const parsedTemplate = parseInt(template, 10);

    if (![1, 2, 3, 4].includes(parsedTemplate)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid template selected: ${template}. Valid options are 1, 2, or 3.`,
      });
    }

    if (!resumeData || typeof resumeData !== "object") {
      return res.status(400).json({
        status: "error",
        message: "Invalid or missing resume data in the request.",
      });
    }

    let atsFriendlyResumeData = await geminiFunction(resumeData);
    // let atsFriendlyResumeData = (resumeData);
    atsFriendlyResumeData = { profilePicture, ...atsFriendlyResumeData };
    const saveAndGenerateRequest = {
      body: { user: req.user, template: parsedTemplate, atsFriendlyResumeData },
    };

    // Create a proper response object
    const saveAndGenerateResponse = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        if (data.status === "error") {
          throw new Error(data.message);
        }
        return data;
      },
    };

    const result = await exports.saveAndGenerateResume(
      saveAndGenerateRequest,
      saveAndGenerateResponse
    );
    if (result) {
      const paymentDetails = await Payment.findOne({ userId: req.user._id });
      const requiredCredits = req.requiredCredits; // Assumes `checkCredits` middleware passed this value
      // Deduct the credits
      paymentDetails.credits -= requiredCredits;
      // Save the updated payment details
      await paymentDetails.save();
    }

    res.status(200).json({
      status: "success",
      template: parsedTemplate,
      resumeData: atsFriendlyResumeData,
      fileName: result.fileName,
      message:
        "Resume processed and generated successfully. You will receive the PDF in your email shortly.",
    });
  } catch (error) {
    console.error("Error processing resume:", error.message);

    res.status(500).json({
      status: "error",
      message: error.message || "Failed to process resume",
    });
  }
};

exports.saveAndGenerateResume = async (req, res) => {
  try {
    const { template, atsFriendlyResumeData, user } = req.body;
    const parsedTemplate = parseInt(template, 10);
    const selected_template = {
      1: () => create_professional_template(user, atsFriendlyResumeData),
      2: () => create_google_template(user, atsFriendlyResumeData),
      3: () => create_college_template(user, atsFriendlyResumeData),
      4: () => create_mba_tempalte(user, atsFriendlyResumeData),
    };
    const fileName = await selected_template[template]();
    console.log("Generated File Name:", fileName);

    // res.status(200).json({
    //   status: "success",
    //   fileName,
    //   message: "Resume generated and saved successfully",
    // });
    return fileName;
  } catch (error) {
    console.error("Error saving and generating resume:", error.message);

    res.status(500).json({
      status: "error",
      message: `Error generating resume: ${error.message}`,
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
