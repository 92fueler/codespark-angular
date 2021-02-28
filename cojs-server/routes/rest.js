const express = require('express')
const router = express.Router()
const problemController = require('../controllers/problemController.js')

router.get('/problems', problemController.getProblems)
router.route('/problems').post(problemController.addProblem)

router.get('/problems/:id', problemController.getProblemById)

module.exports = router
