const { Router } = require('express')
const controller = require('../controllers/userAccount.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', authAdmin, controller.getUserAccounts)
router.get('/:id', controller.getUserAccount)
router.put('/:id', controller.updateUserAccount)
router.delete('/:id', authAdmin, controller.deleteUserAccount)

module.exports = router
