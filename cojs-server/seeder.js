const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const problemModel = require('./models/problemMode.js')
const PROBLEMS = require('./sample-data/sampleProblems.js')
const connectDB = require('./config/db.js')

// this is data seeding. It's completely seperated from the server.
dotenv.config()

connectDB()

const importData = async () => {
  try {
    await problemModel.deleteMany()

    const sampleProblems = PROBLEMS.map((problem) => {
      return { ...problem }
    })

    await problemModel.insertMany(sampleProblems)

    console.log(`data imported!`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await problemModel.deleteMany()

    console.log(`data destroyed!`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
