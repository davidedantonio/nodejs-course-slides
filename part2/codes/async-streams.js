'use strict'

const fs = require('fs')

const asyncStream = async _ => {
  const stream = fs.createReadStream('/home/davide/Downloads/fastbee.sql', { encoding: 'utf8', highWaterMark: 1024 })

  for await (const chunk of stream) {
    console.log('>>> ' + chunk)
  }
  
  console.log('### DONE ###')
}

asyncStream()