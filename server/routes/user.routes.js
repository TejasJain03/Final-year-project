const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { getUser, updateUser } = require("../controllers/user.controller");
const isLoggedIn = require("../middleware/authMiddleware");

router.get("/get-user", isLoggedIn, catchAsync(getUser));
router.put("/update-user", isLoggedIn, catchAsync(updateUser));

module.exports = router;