const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db.js')
const express = require('express')
const app = express()
const path = require('path')
const restRouter = require('./routes/rest.js')
const indexRouter = require('./routes/index.js')

dotenv.config()
connectDB()

app.use(express.static(path.join(__dirname, '../public')))
// parse the incoming request object as a JSON object
app.use(express.json())

app.use('/', indexRouter)
app.use('/api/v1/', restRouter)

app.use('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
})
