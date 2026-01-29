const Task = require('../model/Task')


async function createTask(req, res) {
    try {
        const { projectId } = req.params;
        const { title, description, status, dueDate, priority } = req.body;

        if (!title || !description || !status || !priority) {
            return res.status(409).json({ message: 'Please fill out all required fields' });
        }

        const newTask = new Task({
            user: req.user._id,
            project: projectId,
            title,
            description,
            status,
            priority,
            dueDate: dueDate || null
        });

        await newTask.save();
        await newTask.populate('user', 'username email');
        await newTask.populate('project', 'title description');

        res.status(201).json({ success: true, task: newTask });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'failed to create task', details: error.message });
    }
}
async function deleteTask(req, res) {
    try {
        const { taskId, projectId } = req.params

        const task = await Task.findOneAndDelete(
            {
                _id: taskId,
                project: projectId
            }

        )
        if (!task) return res.status(400).json({ message: 'Task not found for this project' })
        res.json({ message: "Deleted", succes: true })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}
async function updateTask(req, res) {
    try {
        const { taskId, projectId } = req.params

        const task = await Task.findOneAndUpdate({
            _id: taskId,
            project: projectId
        },
            req.body,
            { new: true, runValidators: true }

        )
        if (!task) return res.status(404).json({ message: 'Task not found in this project' })

        await task.populate('user', 'username email');
        await task.populate('project', 'title description');
        res.status(200).json({ success: true, task })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getTasks(req, res) {
    try {
        const filter = {}
        if (req.query.projectId) filter.project = req.query.projectId
        const task = await Task.find(filter)
            .populate('user', 'username email')
            .populate('project', 'name description')
        res.status(200).json({ success: true, task })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching tasks', details: error.message })
    }
}

module.exports = { createTask, deleteTask, updateTask, getTasks }