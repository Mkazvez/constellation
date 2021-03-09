const { Router } = require('express')
const controller = require('../controllers/accountFull.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getAccountFulls)
router.get('/:id', controller.getAccountFull)
router.post('/', controller.addAccountFull)
router.put('/:id', controller.updateAccountFull)
router.delete('/:id', controller.deleteAccountFull)

module.exports = router
