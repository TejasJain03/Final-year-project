const fs = require("fs").promises;
const { launch } = require("puppeteer");
const path = require("path");
const handlebars = require("handlebars");
const ExpressError = require("../../ExpressError");
const sendEmail = require("../../sendEmail");
async function generateCollegeResume(data) {
  // Read the HTML template for the college resume
  const templatePath = path.join(__dirname, "template_College.html");
  let resumeTemplate = await fs.readFile(templatePath, "utf-8");
  // Use Handlebars to compile the HTML template with the provided data
  const template = handlebars.compile(resumeTemplate);
  // Expected data format for college resumes:
  // user(userName, address, email, phone), achievements([achievement1, achievement2, ...]), extracurriculars([activity1, activity2, ...]), skills, education(institution, major, duration), internships([internship1(title, company, description, duration), ...])
  const html = template(data);
  try {
    // Launch Puppeteer to generate PDF from the compiled HTML
    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    // Extract the name from the data object
  
    // Write the PDF to the current folder
    const fileName = `resume.pdf`;
    const filePath = path.join(__dirname, fileName);
    await fs.writeFile(filePath, pdfBuffer);
    sendEmail.sendResumeMail(data.userName, data.email, filePath);
    console.log(`College Resume PDF saved to: ${filePath}`);
    return filePath;
  } catch (error) {
    throw new ExpressError(
      500,
      false,
      `Error generating college resume: ${error.message}`
    );
  }
}

module.exports = generateCollegeResume;
