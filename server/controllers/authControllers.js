const bcrypt = require('bcrypt')
const User = require('../models/users.model')
const Info = require('../models/info.model')
const generateToken = require('../utils/generateToken')
const ExpressError = require('../utils/ExpressError')

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new ExpressError(401, false, 'You already have an account.')
  }

  const user = await User.create({
    userName: name,
    email,
    password,
  })

  const info = await Info.create({
    userId: user._id,
  })

  res.status(201).send({ success: true, user, message: 'Registration successful!' })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new ExpressError(401, false, 'Please register first!')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new ExpressError(
      401,
      false,
      'Incorrect Credentials!!! Please try again',
    )
  }

  generateToken(res, user._id)

  res.status(200).send({
    success: true,
    _id: user._id,
    email: user.email,
    message: 'Login successful!',
  })
}

exports.googleOAuthLogin = async (req, res) => {
  const { email, name, googleId } = req.user // Passport adds user data after Google OAuth success
    // Check if the user exists in the database
    let user = await User.findOne({ email })

    if (!user) {
      // If user does not exist, create a new user
      user = await User.create({
        name,
        email,
        password: googleId, // Storing googleId as password (optional)
      })
    }

    const token = generateToken(user._id)

    // Return the token and user data
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // JWT token
    })
  
}


exports.checkAuth = async (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({
      success: false,
      status: 'logout',
    })
  }
  res.status(200).send({ success: true, message: 'You are already signed in!' })
}

exports.logoutUser = async (req, res) => {
  res.clearCookie("access_token", { httpOnly: true});
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};
