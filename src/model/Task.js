

const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    dueDate: {
        type: Date,
        validate: [{
            validator: function (dueDate) {
                // allow due dates today or later
                return !dueDate || dueDate >= new Date();
            },
            message: "Invalid date entered! Due date must be today or later."
        }]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'notStarted'],
        default: 'notStarted'

    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    }
})

module.exports = model('Task', taskSchema)