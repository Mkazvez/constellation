const { Router } = require('express')
const controller = require('../controllers/perioddevicereader.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getPeriodDeviceReaders)
router.get('/:id', controller.getPeriodDeviceReader)
router.post('/', authAdmin, controller.addPeriodDeviceReader)
router.put('/:id', authAdmin, controller.updatePeriodDeviceReader)
router.delete('/:id', authAdmin, controller.deletePeriodDeviceReader)

module.exports = router
