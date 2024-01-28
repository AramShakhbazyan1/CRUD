const Post = require('../models/postSchem')

const PostService = {

    async findById(id) {
        return Post.findById(id);
    },

    async addPost(data) {
        try {
            const post = new Post(data);
            await post.save();
            return post.toObject();
        } catch (err) {
            console.error('Unexpected book add error:', err.message);
            throw err;
        }
    },

    async deletePost(id) {
        try {
            const result = await Post.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error('Post not found');
            }
            return { success: true, message: 'Post deleted successfully' };
        } catch (err) {
            console.error('Error deleting post:', err.message);
            throw err;
        }
    },

    async updatePost(data) {
        try {
            const result = await Post.findOneAndUpdate({ _id: data._id }, data);
            if (result.modifiedCount === 0) {
                throw new Error('Nothing changed');
            }
            return { success: true, message: 'Post updatet successfully' };
        } catch (err) {
            console.error('Error updating post:', err.message);
            throw err;
        }
    }
}


module.exports = PostService