'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const asyncReadFile = async filename => {
  try {
    const fileContent = await readFile(filename, 'utf-8')
    console.log(fileContent)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}


asyncReadFile(path.join(__dirname, 'first-app.js'))