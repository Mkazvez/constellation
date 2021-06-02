const { Router } = require('express')
const controller = require('../controllers/deviceResult.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDeviceResults)
router.get('/v/', controller.getV_deviceResults)
router.get('/:id', controller.getDeviceResult)
router.post('/', authAdmin, controller.addDeviceResult)
router.put('/:id', authAdmin, controller.updateDeviceResult)
router.put('/r/:id', controller.updateDeviceResultOnly)
router.delete('/:id', authAdmin, controller.deleteDeviceResult)

module.exports = router
