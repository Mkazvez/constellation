const { Router } = require('express')
const controller = require('../controllers/auth.controller')
const router = Router()

router.get('/confirmation-email', controller.checkEmail)
router.get('/recovery-password', controller.checkKeyChangePassword)

module.exports = router
