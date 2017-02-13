const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

router.post('/', function (req, res) {
  // create a new TODO and console log the response
  Todo.create(req.body, function (err, savedTodo) {
    if (err) {
      console.log(err)
      return
    }
    res.send({message: savedTodo})
  })
})
router.get('/', function (req, res) {
  // console log the list of all TODOs
  Todo.find({}, function (err, todoResult) {
    if (err) {
      console.log(err)
      return
    }
    res.send(todoResult)
  })
})
router.get('/:id', function (req, res) {
  // find the TODO with this id and console log it
  Todo.findById(req.params.id, function (err, todoResult) {
    if (err) {
      console.log(err)
      return
    }
    if (todoResult) {
      res.send({ Message: todoResult})
    } else {
      res.send({ Message: 'No todo id found'})
    }
  })
})
router.put('/:id', function (req, res) {
  // find the TODO with this id and update it's params. console log the result.
  Todo.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed}, {new: true}, function (err, updateResult) {
      if (err) {
        console.log(err)
        return
      }

      if (updateResult) {
        res.send({ Message: updateResult})
      } else {
        res.send({ Message: 'Todo id not updated'})
      }
    })
})
router.delete('/:id', function (req, res) {
  // find the TODO with this id and destroy it. console log success/failure.
  Todo.findByIdAndRemove(req.params.id, function (err, destroyResult) {
    if (err) {
      console.log(err)
      return
    }

    if (destroyResult) {
      res.send({message: 'Success deleting todo list  with id:' + req.params.id})
    } else {
      res.send({message: 'todo list not deleted!'})
    }
  })
})

router.delete('/', function (req, res) {
  Todo.remove({}, function (err, destroyAllResult) {
    if (err) {
      console.log(err)
      return
    }
    res.send('All todos destroy')
  })
})

module.exports = router
