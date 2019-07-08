'use strict'

process.stdin.on('data', data => {
  process.stderr.write(`Converting String ${data}`)
  process.stdout.write(data.toString('base64') + '\n')
})