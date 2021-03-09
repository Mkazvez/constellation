const { Router } = require('express')
const controller = require('../controllers/serviceManafacture.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getServiceManafactures)
router.get('/:id', controller.getServiceManafacture)
router.post('/', controller.addServiceManafacture)
router.put('/:id', controller.updateServiceManafacture)
router.delete('/:id', controller.deleteServiceManafacture)

module.exports = router
