var mongoose = require('mongoose')
mongoose.connect('mongodb://sa:password@ds149059.mlab.com:49059/todolistdb')
mongoose.Promise = global.Promise

const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const todosController = require('./controllers/todos_controller')

// startup api middleware, all req goes to controller
app.use(bodyParser.json())

// app.set('view engine', 'ejs')

app.listen(port, function () {
  console.log('Express is running ' + port)
})

app.use('/todos', todosController)

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.send({
    error: err.message
  })
})
