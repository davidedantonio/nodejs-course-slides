'use strict'

const fs = require('fs')
const rs = fs.createReadStream('/home/davide/Downloads/fastbee.sql')

rs.on('data', (data) => {
  console.log('Read chunk:', data.toString())
  console.log("\n\n\n")
})

rs.on('end', () => {
  console.log('No more data')
})