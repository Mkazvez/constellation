const { Router } = require('express')
const controller = require('../controllers/houseServiceManafacture.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getHouseServiceManafactures)
router.get('/:id', controller.getHouseServiceManafacture)
router.post('/', authAdmin, controller.addHouseServiceManafacture)
router.put('/:id', authAdmin, controller.updateHouseServiceManafacture)
router.delete('/:id', authAdmin, controller.deleteHouseServiceManafacture)

module.exports = router
