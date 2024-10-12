const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const GlobalErrorHandler = require('./utils/GlobalErrorHandler')
const ExpressError = require('./utils/ExpressError')


const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to Mongo succesfully')
  } catch (err) {
    console.log('Error while connecting to database')
  }
}
connectDB()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: 'http://localhost:5173',
  // origin: 'https://resumatch.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('Final Year Project')
})

app.use('/resume', require('./routes/resume.routes'));

app.all('*', (req, res, next) => {
  try {
    new ExpressError(404, false, 'Page not found')
  } catch (error) {
    next(error)
  }
})

app.use(GlobalErrorHandler)

app.listen(PORT, (req, res) => {
  console.log(`Server running at port ${PORT}`)
})
