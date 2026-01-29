const express = require('express')
const router = express.Router()
const taskRouter = require('./taskRouter')

const { createProject, deleteProject, updateProject, getProject, getProjects } = require('../controller/projectController')
router.use('/', taskRouter)
// find all
router.get('/', getProjects)
//find one 
router.get('/:projectId', getProject)
// update
router.put('/:projectId', updateProject)
// delete 
router.delete('/:projectId', deleteProject)
//create 
router.post('/', createProject)
