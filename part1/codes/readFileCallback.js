'use strict'

const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'first-app.js'), 'utf-8', (err, fileContent) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  
  console.log(fileContent)
})