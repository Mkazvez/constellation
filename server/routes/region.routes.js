const { Router } = require('express')
const controller = require('../controllers/region.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getRegions)
router.get('/:id', controller.getRegion)
router.post('/', controller.addRegion)
router.put('/:id', controller.updateRegion)
router.delete('/:id', controller.deleteRegion)

module.exports = router
