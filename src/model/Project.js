const { Schema, model } = require('mongoose')

const projectSchema = new Schema({

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
        min: 15
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, ' User needed!'],
        index: true
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'notStarted'],
        default: 'notStarted'
    }
})

module.exports = model('Project', projectSchema)