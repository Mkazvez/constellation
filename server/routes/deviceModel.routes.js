const { Router } = require('express')
const controller = require('../controllers/deviceModel.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDeviceModels)
router.get('/:id', controller.getDeviceModel)
router.post('/', authAdmin, controller.addDeviceModel)
router.put('/:id', authAdmin, controller.updateDeviceModel)
router.delete('/:id', authAdmin, controller.deleteDeviceModel)

module.exports = router
