

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
                return dueDate < new Date()
            },
            message: ' Invalid date entered!'
        }
        ]
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
        enum: ['in-progress', 'completed', 'notStarted'],
        required: true,
    },
    category: {
        enum: ['fitness', 'personal', 'financial', "school"],
        required: true,
    },
    priority: {
        enum: ['low', 'medium', 'high'],
        required: [true, 'how  important is this task'],
    }
})

module.exports = model('Task', taskSchema)