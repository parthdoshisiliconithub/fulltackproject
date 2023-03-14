const router = require('express').Router()
const controller = require('../controllers/user')
const verifyToken = require('../middleware/auth')

/* READ */
router.get('/:id',verifyToken, controller.getUser)
router.get('/:id/friends', verifyToken, controller.getFriends)


/* UPDATE  */
router.put('/:id/:friendId', verifyToken, controller.addRemoveFriend)


module.exports = router