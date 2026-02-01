

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
                if (!dueDate) return true

                const today = new Date()
                today.setHours(0, 0, 0, 0)

                const inputDate = new Date(dueDate)
                inputDate.setHours(0, 0, 0, 0)

                return inputDate >= today
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
        require: true
    }
})

module.exports = model('Task', taskSchema)