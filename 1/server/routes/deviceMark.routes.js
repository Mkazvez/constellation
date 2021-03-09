const { Router } = require('express')
const controller = require('../controllers/deviceMark.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDeviceMarks)
router.get('/:id', controller.getDeviceMark)
router.post('/', authAdmin, controller.addDeviceMark)
router.put('/:id', authAdmin, controller.updateDeviceMark)
router.delete('/:id', authAdmin, controller.deleteDeviceMark)

module.exports = router
