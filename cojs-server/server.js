const dotenv = require('dotenv')
const colors = require('colors')
const express = require('express')
const app = express()

dotenv.config()

// parse the incoming request object as a JSON object
app.use(express.json())

app.get('/', (req, res) => {
  res.send('app is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
})
