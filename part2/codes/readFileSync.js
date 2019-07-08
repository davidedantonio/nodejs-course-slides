'use strict'

const fs = require('fs')
const path = require('path')

let data
try {
  data = fs.readFileSync(path.join(__dirname, 'help2.txt'))
} catch (error) {
  console.error(error)
  process.exit(1)
}

console.log(data.toString())