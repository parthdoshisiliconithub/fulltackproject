const route = require('express').Router()
const controllers = require('../controllers/post')
const verifytoken = require('../middleware/auth')

/* READ  */
route.get('/', verifytoken, controllers.getFeedPosts)
route.get('/:userId', verifytoken, controllers.getUserPosts)


/* UPDATE */
route.patch('/:id/like', verifytoken, controllers.likePost)

module.exports = route