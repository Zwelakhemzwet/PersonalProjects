const mongoose = require('mongoose');

const RecordingSchema = new mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        trim: true
    },
    originalName: {
        type: String,
        trim: true
    },
    size: {
        type: String
    },
    uploadDate: {
        type: String,
        default: new Date().toISOString()
    },
    url: {
        type: String
    },
    metadata: {
        type: String
    }

});

module.exports = mongoose.model('Recording', RecordingSchema);