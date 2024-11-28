const puppeteer = require("puppeteer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const tempdata = require("./response.json");
const sendEmail=require('../../sendEmail')

// Populate template with data
const data = {
  name: "Uttam",
  summary: "A passionate software developer...",
  experience: [
    {
      company: "Accenture",
      location: "Bangalore",
      jobTitle: "Software Developer",
      startDate: "Oct 2024",
      endDate: "Present",
      description: "Working on backend services and APIs...",
    },
  ],
  education: [
    {
      school: "Mangalore Institute of Technology & Engineering",
      location: "Moodbidri",
      degree: "B.Tech in Computer Science",
      startDate: "Aug 2020",
      endDate: "Jun 2024",
      description: "Completed with distinction.",
    },
  ],
  projects: [
    {
      name: "Resume Builder",
      detail: "MERN Stack Project",
      description: "Allows users to generate dynamic resumes.",
    },
  ],
  skills: ["JavaScript", "Node.js", "MongoDB", "React"],
  awards: ["Dean’s List 2022", "Hackathon Winner 2023"],
  languages: ["English", "Hindi", "Kannada"],
  address: "123 Your Street",
  city: "Udupi",
  state: "Karnataka",
  zip: "576101",
  phone: "(123) 456-7890",
  email: "uttam@example.com",
};

// Generate PDF using Puppeteer
const generateGoogleResume = async (resumeData) => {
  const templatePath = path.join(__dirname, "google_Template.html");
  let resumeTemplate = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(resumeTemplate);
  const html = template(resumeData);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const pdfBuffer = await page.pdf({ format: 'A4' });


  await browser.close();

  const fileName = `resume.pdf`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, pdfBuffer);
  sendEmail.sendResumeMail(resumeData.userName,resumeData.email,filePath)

  console.log(`Resume PDF saved to: ${filePath}`);
  return filePath;
};

module.exports = generateGoogleResume;
