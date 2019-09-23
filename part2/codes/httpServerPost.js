const http = require('http')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const form = fs.readFileSync(path.join(__dirname, 'form.html'))

function get (res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(form)
}

function post (req, res) {
  if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    reject(415, 'Unsupported Media Type', res)
    return
  }
  const size = parseInt(req.headers['content-length'], 10)
  const buffer = Buffer.allocUnsafe(size)
  var pos = 0

  req
    .on('data', (chunk) => {
      const offset = pos + chunk.length
      if (offset > size) {
        reject(413, 'Too Large', res)
        return
      }
      chunk.copy(buffer, pos)
      pos = offset
    })
    .on('end', () => {
      if (pos !== size) {
        reject(400, 'Bad Request', res)
        return
      }
      const data = qs.parse(buffer.toString())
      res.end('You Posted: ' + JSON.stringify(data))
    })
}

http.createServer((req, res) => {
  if (req.method === 'GET') {
    get(res)
    return
  }
  if (req.method === 'POST') {
    post(req, res)
    return
  }
  reject(405, 'Method Not Allowed', res)
}).listen(3000)
