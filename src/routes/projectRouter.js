const express = require('express')
const router = express.Router()
const authMiddleware = require('../utils/authMiddleware')

const { createProject, deleteProject, updateProject, getProjects } = require('../controller/projectController')

// find all
router.get('/', authMiddleware, getProjects)
// update
router.put('/:projectId', authMiddleware, updateProject)
// delete 
router.delete('/:projectId', authMiddleware, deleteProject)
//create 
router.post('/', authMiddleware, createProject)

module.exports = router 