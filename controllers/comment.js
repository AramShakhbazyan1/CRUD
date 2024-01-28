const PostService = require('../services/PostService')

const commentController = {
    createComment: async (req, res, next) => {
        const commetnData = {
            commentText: req.body.commentText,
            author: req.user.fullName,
            authorId: req.user._id
        }
        const data = await PostService.findById(req.body.postId)
        commetnData.id = Date.now();
        data.comments.push(commetnData)
        const post = await PostService.updatePost(data);
        res.status(200).json(post);
    },

    deleteComment: async (req, res, next) => {

        const post = await PostService.findById(req.body.postId)
        const postAuthorId = post.authorId;

        const comments = post.comments;
        let commentOwnerId;
        let index = -1;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id == req.body.commentId) {
                commentOwnerId = comments[i].authorId;
                index = i;
                break;
            }
        }
        if (req.user._id.toString() != commentOwnerId?.toString() && req.user._id.toString() != postAuthorId) {
            return res.status(403).json({ message: "You cant delete comment which is not writen by you or under your post" })
        }

        if (index != -1) {
            post.comments.splice(index, 1);
        }
        const data = PostService.updatePost(post);
        res.status(200).json(post)

    }

}

module.exports = commentController;
