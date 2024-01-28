const PostService = require('../services/PostService')

const postController = {

    createPost: async (req, res, next) => {
        const data = {
            title: req.body.title,
            body: req.body.body,
            author: req.user.fullName,
            authorId: req.user._id
        }
        const post = await PostService.addPost(data);
        res.status(200).json(post);
    },

    deletePost: async (req, res, next) => {
        const post = await PostService.deletePost(req.body._id);

        res.status(200).json(post.message);
    },

    updatePost: async (req, res, next) => {

        const post = await PostService.updatePost(req.body);
        res.status(200).json(post.message);
    }

}

module.exports = postController;