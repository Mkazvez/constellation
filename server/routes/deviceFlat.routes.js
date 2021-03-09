const { Router } = require('express')
const controller = require('../controllers/deviceFlat.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDeviceFlats)
router.get('/:id', controller.getDeviceFlat)
router.post('/', authAdmin, controller.addDeviceFlat)
router.put('/:id', authAdmin, controller.updateDeviceFlat)
router.delete('/:id', authAdmin, controller.deleteDeviceFlat)

module.exports = router
