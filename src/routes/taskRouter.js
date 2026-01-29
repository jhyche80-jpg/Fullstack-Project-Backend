
const express = require('express')
const router = express.Router()
const { createTask, deleteTask, updateTask, getTasks } = require('../controller/taskController')
const authMiddleware = require('../utils/authMiddleware')
// find all
router.get('/projects/:projectId/tasks', authMiddleware, getTasks)
// update
router.put('/projects/:projectId/tasks/:taskId', authMiddleware, updateTask)
// delete 
router.delete('/projects/:projectId/tasks/:taskId', authMiddleware, deleteTask)
//create 
router.post('/projects/:projectId/tasks', authMiddleware, createTask)


module.exports = router 