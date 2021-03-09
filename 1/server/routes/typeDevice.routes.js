const { Router } = require('express')
const controller = require('../controllers/typeDevice.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.gettypeDevices)
router.get('/:id', controller.gettypeDevice)
router.post('/', controller.addtypeDevice)
router.put('/:id', controller.updatetypeDevice)
router.delete('/:id', controller.deletetypeDevice)

module.exports = router
