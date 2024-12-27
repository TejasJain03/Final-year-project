<h1 align="center">Resume Generator Application</h1>

<p align="center">
  A dynamic, ATS-compliant resume generation platform built using the <strong>MERN stack</strong>. This application allows users to create professional resumes tailored to specific roles with the help of the <strong>GEMINI API</strong> for content enhancement. It also features subscription-based access powered by <strong>Razorpay</strong> and delivers resumes via email in PDF format.
</p>

---

<h2>Features</h2>
<ul>
  <li><strong>User-Friendly Interface:</strong> Allows users to easily input details and select from multiple resume templates.</li>
  <li><strong>ATS Compliance:</strong> Ensures the generated resumes are optimized for Applicant Tracking Systems.</li>
  <li><strong>Role-Specific Optimization:</strong> Uses the GEMINI API for content enhancement tailored to the user's role.</li>
  <li><strong>Secure Payments:</strong> Subscription-based access managed through Razorpay integration.</li>
  <li><strong>Automated Email Delivery:</strong> Sends the generated resume directly to the user's email in PDF format.</li>
  <li><strong>Scalable and Efficient:</strong> Designed for high performance and seamless user experience.</li>
</ul>

---

<h2>Installation</h2>

<h3>Prerequisites</h3>
<p>Ensure the following are installed on your system:</p>
<ul>
  <li><strong>Node.js</strong> (v14 or later)</li>
  <li><strong>MongoDB</strong></li>
  <li><strong>NPM/Yarn</strong></li>
  <li><strong>Docker</strong> (optional, for containerized setup)</li>
</ul>

<h3>Steps to Install</h3>
<ol>
  <li>
    <strong>Clone the Repository:</strong>
    <pre><code>https://github.com/TejasJain03/Final-year-project.git
cd Final-year-project</code></pre>
  </li>
  <li>
    <strong>Set Up the Backend:</strong>
    <pre><code>cd server
npm install</code></pre>
    <p>Create a <code>.env</code> file in the <code>server</code> directory with the following variables:</p>
    <pre><code>PORT=5000
MONGO_URI=your_mongo_connection_string
GEMINI_API_KEY=your_gemini_api_key
SMTP_PASS=your_email_smtp_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret</code></pre>
  </li>
  <li>
    <strong>Set Up the Frontend:</strong>
    <pre><code>cd ../client
npm install</code></pre>
  </li>
  <li>
    <strong>Start the Application:</strong>
    <pre><code># Run the backend
cd ../server
npm start

# Run the frontend
cd ../client
npm start</code></pre>
  </li>
  <li>
    <strong>Access the Application:</strong>
    Open your browser and go to <code>http://localhost:5173</code>.
  </li>
</ol>

---

<h2>Commands</h2>

<h3>Development Mode</h3>
<pre><code># Start the backend
cd server
npm run dev

# Start the frontend
cd client
npm run dev</code></pre>

<h3>Docker Setup (Optional)</h3>
<p>To run the application using Docker, make sure Docker is installed and use the provided <code>docker-compose.yml</code>:</p>
<pre><code>docker-compose up --build</code></pre>

---
