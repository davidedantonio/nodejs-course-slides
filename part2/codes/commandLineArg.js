'use strict'

const fs = require('fs')
const path = require('path')
const args = process.argv

if (args.length === 2) {
  console.log('File name arguments required')
  process.exit(1)
}

let data
try {
  data = fs.readFileSync(path.resolve(__dirname, process.argv[2]))
} catch (error) {
  console.error(error)
  process.exit(1)
}

console.log(data.toString())