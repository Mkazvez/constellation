const { Router } = require('express')
const controller = require('../controllers/device.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDevices)
router.get('/:id', controller.getDevice)
router.post('/', authAdmin, controller.addDevice)
router.put('/:id', authAdmin, controller.updateDevice)
router.delete('/:id', authAdmin, controller.deleteDevice)

module.exports = router
