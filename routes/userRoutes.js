const { Router } = require('express');
const authenticateToken = require('../middleware/auth');
const controller = require('../controllers/UserController')
const sql = require('../models/User')
const router = Router();

router.get('/', controller.getUsers);
router.post('/auth/register',controller.addUser);
router.get('/:id',controller.getUserById)
router.delete('/:id',controller.deleteUser)
router.put('/:id', controller.updateUser)

router.post('/auth/login', controller.login)
router.post('/auth/logout', controller.logout)
router.post('/auth/refresh-token',controller.refreshToken)
router.delete('/auth/refresh-token',controller.clearRefreshToken)

 

module.exports = router;