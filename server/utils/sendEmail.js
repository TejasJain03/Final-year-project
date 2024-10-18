const nodemailer = require("nodemailer");
const ExpressError = require("./ExpressError");
const path = require('path');

const premiumMailTemplate = (userName, premiumType) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #007bff;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
      }
      .content h2 {
        color: #333;
        margin: 0 0 10px;
      }
      .content p {
        margin: 10px 0;
        color: #555;
      }
      .premium-info {
        background-color: #f9f9f9;
        padding: 15px;
        border-left: 4px solid #007bff;
        margin: 15px 0;
      }
      .footer {
        text-align: center;
        background-color: #007bff;
        color: #ffffff;
        padding: 15px;
      }
      .footer p {
        margin: 0;
        font-size: 14px;
      }
      .button {
        background-color: #28a745;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        display: inline-block;
        margin-top: 20px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Premium, ${userName}!</h1>
      </div>

      <div class="content">
        <h2>Thank you for subscribing!</h2>
        <p>We're thrilled to have you on board as a premium member.</p>

        <div class="premium-info">
          <p><strong>Subscription Type:</strong> ${premiumType}</p>
          <p>Enjoy all the exclusive benefits that come with your subscription. We're committed to making your experience exceptional!</p>
        </div>

        <p>If you have any questions or need further assistance, feel free to reply to this email.</p>

        <a href="#" class="button">Explore Premium Features</a>
      </div>

      <div class="footer">
        <p>&copy; 2024 Resume Builder. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`
}

exports.sendPremiumMail = async (userName, userEmail, premiumType) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ecomm561@gmail.com",
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"ResuMATCH" <no-reply@resumatch.com>',
    to: userEmail,
    subject: "Welcome to ResuMATCH Premium",
    html: premiumMailTemplate(userName, premiumType)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new ExpressError(500, false, error.message)
  }
};

const resumeMailTemplate = (userName) => { 
    return `
    <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
      }
      .content h2 {
        color: #333;
        margin-bottom: 10px;
      }
      .content p {
        color: #555;
        margin-bottom: 10px;
      }
      .resume-info {
        background-color: #f9f9f9;
        padding: 15px;
        border-left: 4px solid #4CAF50;
        margin: 15px 0;
      }
      .button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin-top: 15px;
      }
      .footer {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 10px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Resume is Ready, ${userName}!</h1>
      </div>

      <div class="content">
        <h2>Here is your professional resume.</h2>
        <p>We’ve generated your resume based on the details you provided. You’ll find it attached to this email.</p>

        <div class="resume-info">
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <p>If you need to make any changes, feel free to edit and regenerate the resume anytime.</p>

        <a href="#" class="button">View Your Profile</a>
      </div>

      <div class="footer">
        <p>&copy; 2024 Resume Builder. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`
}

exports.sendResumeMail = async (userName, userEmail) => { 
    const resumePath = path.join(__dirname, './templates/resume.pdf');
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ecomm561@gmail.com",
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    
      const mailOptions = {
        from: '"ResuMATCH" <no-reply@resumatch.com>',
        to: userEmail,
        subject: "Your resume is ready!!!",
        html: resumeMailTemplate(userName),
        attachments: [
            {
              filename: 'resume.pdf', // Customize filename if needed
              path: resumePath, // Path to the generated resume file
              contentType: 'application/pdf',
            },
          ],      
      };
    
      try {
        const info = await transporter.sendMail(mailOptions);
        return info;
      } catch (error) {
        throw new ExpressError(500, false, error.message)
      }
 };