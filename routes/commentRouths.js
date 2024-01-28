const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const commentController = require('../controllers/comment');

router.put('/createComment', checkAuth, commentController.createComment);
router.put('/deleteComment', checkAuth, commentController.deleteComment);

module.exports = router;
