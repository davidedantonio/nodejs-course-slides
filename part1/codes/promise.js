'use strict'

const fs = require('fs')

const readTextFromFile = _ => new Promise((resolve, reject) => {
  fs.readFile('fileA.txt', (err, data) => {
    if (err) {
      return reject(err)
    }

    resolve(data.toString())
  })
})

// Usage of a method that returns Promise
readTextFromFile()
  .then(data => console.log(data))
  .catch(e => console.log(e))