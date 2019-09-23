'use strict'

const request = require('request')
const npmDb = 'https://skimdb.npmjs.com'

const registryUrl = `${npmDb}/registry/_changes?include_docs=true`

request(registryUrl, function (err, data) {
  if (err) {
    throw err
  }

  const numberOfLines = data.split('\n').length + 1
  console.log('Total modules on npm: ' + numberOfLines)
})