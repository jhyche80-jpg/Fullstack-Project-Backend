
const express = require('express')
const router = express.Router()
const { createTask, deleteTask, updateTask, getTask, getTasks } = require('../controller/taskController')

// find all
router.get('/task', getTasks)
//find one 
router.get('/:taskId', getTask)
// update
router.put('/:taskId', updateTask)
// delete 
router.delete('/:taskId', deleteTask)
//create 
router.post('/task', createTask)
