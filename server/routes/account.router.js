const { Router } = require('express')
const controller = require('../controllers/account.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getAccounts)
router.get('/v/', controller.getv_accountusers)
router.get('/:id', controller.getAccount)
router.post('/', controller.addAccount)
router.put('/:id', controller.updateAccount)
router.delete('/:id', controller.deleteAccount)

module.exports = router
