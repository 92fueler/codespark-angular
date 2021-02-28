const asyncHandler = require('express-async-handler')
const problemModel = require('../models/problemMode.js')

/**
 * @desc fetch all problems
 * @route GET /api/v1/problems
 */
const getProblems = asyncHandler(async (req, res) => {
  const problems = await problemModel.find({})
  res.json(problems)
})

/**
 * @desc fetch single problem by ID
 * @route GET /api/v1/problems/:id
 */
const getProblemById = asyncHandler(async (req, res) => {
  const problem = await problemModel.findOne({
    id: +req.params.id,
  })
  if (problem) {
    res.json(problem)
  } else {
    res.status(404)
    throw new Error('Problem Not Found')
  }
})

/**
 * @desc add a new problem
 * @route POST /api/v1/problems
 */
const addProblem = asyncHandler(async (req, res) => {
  const { title, desc, difficult } = req.body
  const problemByTitle = await problemModel.findOne({ title: title })
  if (problemByTitle) {
    throw new Error('Problem already exists')
  }

  const totalNumOfProblems = await problemModel.countDocuments()
  const newProblem = new problemModel({
    id: totalNumOfProblems + 1,
    title: title,
    desc: desc,
    difficult: difficult,
  })

  if (newProblem) {
    const newProblemCreated = await newProblem.save()
    res.status(201).json(newProblemCreated)
  } else {
    res.status(404)
    throw new Error('Cannot create the problem this time ... ')
  }
})

module.exports = {
  getProblems,
  getProblemById,
  addProblem,
}
