const Project = require('../model/Project')
const mongoose = require('mongoose')
async function createProject(params) {
    try {

    } catch (error) {

    }
}
async function deleteProject(params) {
    try {

    } catch (error) {

    }
}
async function updateProject(params) {
    try {

    } catch (error) {

    }
}
async function getProject(params) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

    } catch (error) {

    }
}
//get all  
async function getProjects(params) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const project = await Project.find({ user: req.user._id })
        res.status(201).json(project || [])

    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects', details: error.message })
    }
}




module.exports = { createProject, deleteProject, updateProject, getProject, getProjects }