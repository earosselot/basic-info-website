require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')

const { PORT, HOST } = process.env
const baseURL = `http://${HOST}:${PORT}`
const readFilePaths = ['/index', '/about', '/contact-me']

function readFile(filename) {
  const filepath = path.join('./', filename)
  const data = fs.readFileSync(filepath, 'utf-8')
  return data
}

const server = http.createServer((req, res) => {
  const urlInfo = new URL(req.url, baseURL)

  if (readFilePaths.includes(urlInfo.pathname)) {
    const data = readFile(urlInfo.pathname + '.html')
    res.statusCode = 200
    res.end(data)
  } else {
    const data = readFile('404.html')
    res.statusCode = 404
    res.end(data)
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
