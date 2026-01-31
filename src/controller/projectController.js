const Project = require('../model/Project')
const mongoose = require('mongoose')
const Task = require('../model/Task')

async function createProject(req, res) {
    try {
        const { title, dueDate, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ message: 'Please fill out all required fields' });
        }

        const projectData = { ...req.body, user: req.user._id };
        if (dueDate) projectData.dueDate = dueDate;

        const newProject = await Project.create(projectData);
        res.status(201).json({
            message: 'Project created successfully',
            newProject
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', details: error.message });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.projectId,
            user: req.user._id
        });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found or unauthorized" });
        }

        // Cascade delete tasks
        await Task.deleteMany({ project: project._id });

        res.status(200).json({ success: true, message: "Project and related tasks deleted" });
        if (!project) return res.status(404).json({ message: "Project does not exist or Unauthorized to access project" })
    } catch (error) {
        res.status(500).json(error)
    }
}

async function updateProject(req, res) {
    try {
        const project = await Project.findOneAndUpdate({ _id: req.params.projectId, user: req.user._id }, req.body, { new: true, runValidators: true })
        if (!project) {
            return res.status(404).json({ message: " Project is not found or you are not authorized to do this" })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json(error)
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




module.exports = { createProject, deleteProject, updateProject, getProjects }