const { Router } = require('express')
const controller = require('../controllers/user.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', authAdmin, controller.getUsers)
router.get('/all/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.put('/activate-user/:id', authAdmin, controller.activateUser)
router.delete('/:id', authAdmin, controller.deleteUser)

module.exports = router
