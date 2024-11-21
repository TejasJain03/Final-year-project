const ExpressError = require("../utils/ExpressError");
const { sendResumeMail } = require("../utils/sendEmail");
const path = require("path");
const User = require("../models/users.model");
const { create_professional_template, create_google_template,create_college_template } = require("../utils/templates/create_Template");
const axios = require('axios'); // Ensure Axios is installed for making API requests

exports.createResume = async (req, res) => {
  try {
    console.log("Request Body Received:", JSON.stringify(req.body, null, 2));

    const { template, ...resumeData } = req.body;

    console.log("Extracted Template:", template);
    console.log("Extracted Resume Data:", JSON.stringify(resumeData, null, 2));

    const parsedTemplate = parseInt(template, 10);

    if (![1, 2, 3].includes(parsedTemplate)) {
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

    const prompt = `You are an expert in creating ATS-friendly resumes. Please process the following resume data to make it fully compliant with ATS standards and optimized for a software developer role. Ensure the following:

1. Highlight modern and in-demand skills by enclosing them in strong HTML Tags (e.g., <strong>JavaScript</strong>, <strong>React</strong>).
2. Use concise and impactful language while preserving the structure and formatting of the input JSON.
3. Incorporate software development keywords that are relevant to modern technologies, frameworks, and methodologies (e.g., Agile, DevOps, CI/CD, etc.).
4. Do not include any text or explanation outside of the updated JSON object.
5. Retain the exact structure of the input JSON for seamless integration.

Here is the resume data:
${JSON.stringify(resumeData)}`;

    console.log("Generated Prompt:", prompt);

    const geminiApiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB6gVjEDQN2ZKX2Ph81gzS90_2YyHo61c4";

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

    console.log("Gemini API Request Payload:", JSON.stringify(geminiRequestPayload, null, 2));

    const geminiResponse = await axios.post(geminiApiUrl, geminiRequestPayload, {
      headers: { "Content-Type": "application/json" },
      timeout: 60000, // 1 minute timeout
    });

    const responseText = geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return res.status(500).json({
        status: "error",
        message: "Gemini API returned no valid content.",
      });
    }

    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    const atsFriendlyResumeData = JSON.parse(cleanedResponse);

    console.log("Processed ATS-Friendly Resume Data:", JSON.stringify(atsFriendlyResumeData, null, 2));

    const saveAndGenerateRequest = {
      body: { template: parsedTemplate, atsFriendlyResumeData },
    };

    const saveAndGenerateResponse = {
      status: (code) => ({
        json: (response) => console.log("SaveAndGenerate Response:", response),
      }),
    };

    await exports.saveAndGenerateResume(saveAndGenerateRequest, saveAndGenerateResponse);

    res.status(200).json({
      status: "success",
      template: parsedTemplate,
      resumeData: atsFriendlyResumeData,
      message: "Resume processed and saveAndGenerate triggered successfully",
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
    console.log("SaveAndGenerate Request Received:", JSON.stringify(req.body, null, 2));

    const { template, atsFriendlyResumeData } = req.body;

    const parsedTemplate = parseInt(template, 10);

    if (![1, 2, 3].includes(parsedTemplate)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid template selected: ${template}. Valid options are 1, 2, or 3.`,
      });
    }

    const selected_template = {
      1: async () => await create_professional_template(atsFriendlyResumeData),
      2: async () => await create_google_template(atsFriendlyResumeData),
      3: async () =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error("Template generation timed out")), 90000);
          console.log("Starting college template generation...");
          create_college_template(atsFriendlyResumeData)
            .then((file) => {
              clearTimeout(timer);
              resolve(file);
            })
            .catch((err) => {
              clearTimeout(timer);
              reject(err);
            });
        }),
    };

    const fileName = await selected_template[parsedTemplate]();
    console.log("Generated File Name:", fileName);

    res.status(200).json({
      status: "success",
      fileName,
      message: "Resume generated and saved successfully",
    });
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
  console.log(pdfPath)
  await fs.unlink(pdfPath);

  res
    .status(200)
    .json({ status: "success", message: "Resume has been sent to your email" });
};
