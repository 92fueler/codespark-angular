const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db.js')
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const restRouter = require('./routes/rest.js')
const indexRouter = require('./routes/index.js')

const socket_io = require('socket.io')
const io = socket_io()
const socketController = require('./controllers/socketController.js')(io)

dotenv.config()
connectDB()

app.use(express.static(path.join(__dirname, '../public')))
// parse the incoming request object as a JSON object
app.use(express.json())

app.use('/', indexRouter)
app.use('/api/v1/', restRouter)

app.use('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
})

const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
// console.log(
// `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
// .bold
// )
// })

var server = http.createServer(app)
io.attach(server)
server.listen(PORT)

server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
  throw error
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr == 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log(`app is listening on ${bind}`.brightYellow)
}
