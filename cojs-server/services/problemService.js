const PROBLEMS = require('../sample-data/sampleProblems.js')

const getProblems = function () {
  return new Promise((resolve, reject) => {
    resolve(PROBLEMS)
  })
}

module.exports = {
  getProblems,
}
