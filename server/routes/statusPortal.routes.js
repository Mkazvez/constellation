const { Router } = require('express')
const controller = require('../controllers/statusPortal.controller')
const router = Router()

router.get('/', controller.getStatusPortals)
router.get('/:id', controller.getStatusPortal)
router.post('/', controller.addStatusPortal)
router.put('/:id', controller.updateStatusPortal)
router.delete('/:id', controller.deleteStatusPortal)

module.exports = router
