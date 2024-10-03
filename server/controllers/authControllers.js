const bcrypt = require('bcrypt')
const User = require('../models/users.model')
const generateToken = require('../utils/generateToken')

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new ExpressError(401, false, 'You have already exists.')
  }

  const user = await User.create({
    userName: name,
    email,
    password,
  })
  res.send({ success: true, user })
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

  res.status(201).send({
    success: true,
    _id: user._id,
    email: user.email,
    message: 'Login successful!',
  })
}
