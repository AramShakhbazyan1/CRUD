const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = model('Comment', CommentSchema);
