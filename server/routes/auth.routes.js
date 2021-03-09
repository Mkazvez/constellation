const { Router } = require('express')
const controller = require('../controllers/auth.controller')
const router = Router()

router.post('/', controller.authUser)
router.post('/register', controller.registerUser)
router.post('/forgot-password', controller.forgotPassword)
router.post('/change-password', controller.changePassword)
router.get('/logout', controller.logout)

module.exports = router
