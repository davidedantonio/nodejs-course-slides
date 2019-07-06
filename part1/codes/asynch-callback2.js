'use strict'

function addAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 0)
}

console.log('before')
addAsync(1, 2, result => console.log('Result: ' + result))
console.log('after')