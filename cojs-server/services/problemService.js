const PROBLEMS = require('../sample-data/sampleProblems.js')

const getProblems = function () {
  return new Promise((resolve, reject) => {
    resolve(PROBLEMS)
  })
}

const getProblem = function (id) {
  return new Promise((resolve, reject) => {
    resolve(PROBLEMS.find((problem) => problem.id === id))
  })
}

const addProblem = function (newProblem) {
  return new Promise((resolve, reject) => {
    if (PROMLEMS.find((problem) => promblem.title === newProblem.title)) {
      reject('Problem already exists!')
    } else {
      newProblem.id = PROBLEMS.length + 1
      PROBLEMS.push(newProblem)
      resolve(newProblem)
    }
  })
}

module.exports = {
  getProblems,
  getProblem,
  addProblem,
}
