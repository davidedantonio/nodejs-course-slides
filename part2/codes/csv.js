'use strict'

const json2csv = require('json2csv').parse
const fields = ['car', 'price', 'color']
const fs = require('fs')
const path = require('path')
const myCars = [
  {
    "car": "Audi",
    "price": 40000,
    "color": "blue"
  },
  {
    "car": "Jeep",
    "price": 40000,
    "color": "red"
  },
]

try {
  const csv = json2csv(myCars, {
    fields: fields,
    delimiter: ';'
  })
  fs.writeFileSync(path.join(__dirname, 'cars.csv'), csv, 'utf8')
} catch (err) {
  console.error(err)
}