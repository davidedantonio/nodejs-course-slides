'use strict'

const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'help.txt'), (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(data.toString())
})