const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');

async function generateResume(data) {
    const { name, skills, projects, education } = data;

    // Read the HTML template from a separate file
    const templatePath = path.join(__dirname, 'template_One.html');
    let resumeTemplate = await fs.readFile(templatePath, 'utf-8');

    // Use Handlebars to compile the HTML template with the provided data
    const template = handlebars.compile(resumeTemplate);
    // user(userName, address, email, phone, github, linkedin), job(job1(title, company, responsibility1, responsibility2, responsibility3, duration), job2(title, company, responsibility1, responsibility2, responsibility3, duration)), skills, projects(project1(title, description1, description2, technologies), project2(title, description1, description2, technologies)), education(institution, major, duration)
    const html = template({ user, job, skills, projects, education });

    try {
        // Launch Puppeteer to generate PDF from the compiled HTML
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        // Write the PDF to current folder
        const fileName = `${name.replace(/\s+/g, '_')}_resume.pdf`;
        const filePath = path.join(__dirname, fileName);

        await fs.writeFile(filePath, pdfBuffer);

        console.log(`Resume PDF saved to: ${filePath}`);
        return filePath;
    } catch (error) {
        throw new ExpressError(500, false, `Error generating resume: ${error.message}`);
    }
}

module.exports = generateResume;
