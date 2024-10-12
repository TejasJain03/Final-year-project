const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils/catchAsync");
const { getUser, updateUser } = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/get-user", authMiddleware, catchAsync(getUser));
router.put("/update-user", authMiddleware, catchAsync(updateUser));

module.exports = router;