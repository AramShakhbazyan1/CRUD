const { Schema, model } = require('mongoose');

const PostSchema = Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    lastModification: {
        type: Date,
        default: Date.now,
        required: true
    },
    comments: {
        type: [Object],
        default: [],
        required: false
    }
});

module.exports = model('Post', PostSchema);