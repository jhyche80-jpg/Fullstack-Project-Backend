const Project = require('../model/Project')
const mongoose = require('mongoose')
async function createProject(req, res) {
    try {
        const { title, dueDate, description, status, category } = req.body
        if (!title || !description || !status || !category) {
            return res.status(409).json({ message: 'Please fill out all fields' })
        }
        req.body.user = req.user._id
        const newProject = await Project.create(req.body)
        res.json(newProject)
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', details: error.message })
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })
        if (!project) return res.status(404).json({ message: "Project does not exist or Unauthorized to access project" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function updateProject(req, res) {
    try {
        const project = await Project.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true })
        if (!project) {
            return res.status(404).json({ message: " Project is not found or you are not authorized to do this" })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getProject(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project Id' })
        }
        const project = await Project.findOne({ _id: id, user: req.user._id })
        if (!project) {
            return res.status(404).json({ message: 'Project is not found' })
        }
        res.json(project)

    } catch (error) {
        res.status(500).json({ message: 'Project not found' })
    }
}

//get all  
async function getProjects(req, res) {
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