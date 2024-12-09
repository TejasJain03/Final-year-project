const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const GlobalErrorHandler = require("./utils/GlobalErrorHandler");
const ExpressError = require("./utils/ExpressError");
const compression = require("compression");

const authRoutes = require("./routes/authRoutes");

// MongoDB connection
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo succesfully");
  } catch (err) {
    console.log("Error while connecting to database");
  }
};
connectDB();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  // origin: 'https://resumatch.netlify.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
// app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json("Final Year Project");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resume", require("./routes/resume.routes"));
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/payment", require("./routes/payment.routes"));

// wrong routes handler
app.all("*", (req, res, next) => {
  try {
    new ExpressError(404, false, "Page not found");
  } catch (error) {
    next(error);
  }
});

app.use(GlobalErrorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Server running at port ${PORT}`);
});

app.use((req, res, next) => {
  res.setTimeout(60000, () => {
    console.log("Request timed out");
    res.status(408).json({ status: "error", message: "Request timed out" });
  });
  next();
});
