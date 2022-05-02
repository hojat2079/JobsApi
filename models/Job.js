const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        requried: [true, 'please provide company name'],
        maxlength: 30
    },
    position: {
        type: String,
        requried: [true, 'please provide position'],
        maxlength:50,
    },
    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'declined'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide User']
    }
},{timestamps:true});

module.exports= mongoose.model('Job',JobSchema)