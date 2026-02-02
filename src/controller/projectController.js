const Project = require('../model/Project');
const Task = require('../model/Task');

async function createProject(req, res) {
    try {
        const { title, dueDate, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ message: 'Please fill out all required fields' });
        }

        // Convert dueDate string to Date if provided
        const dueDateObj = dueDate ? new Date(dueDate) : null;

        const newProject = await Project.create({
            title,
            description,
            status,
            dueDate: dueDateObj,
            user: req.user._id
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating project', details: error.message });
    }
}

async function updateProject(req, res) {
    try {
        const { title, description, status, dueDate } = req.body;

        const updateData = {
            ...(title && { title }),
            ...(description && { description }),
            ...(status && { status }),
            ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
        };

        const project = await Project.findOneAndUpdate(
            { _id: req.params.projectId, user: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) return res.status(404).json({ message: "Project not found" });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.projectId,
            user: req.user._id
        });

        if (!project) return res.status(404).json({ success: false, message: "Project not found" });

        // Cascade delete tasks
        await Task.deleteMany({ project: project._id });
        res.status(200).json({ success: true, message: "Project and related tasks deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getProjects(req, res) {
    try {
        const projects = await Project.find({ user: req.user._id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', details: error.message });
    }
}

module.exports = { createProject, deleteProject, updateProject, getProjects };