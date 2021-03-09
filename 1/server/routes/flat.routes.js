const { Router } = require('express')
const controller = require('../controllers/flat.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getFlats)
router.get('/v/', controller.getV_Flats)
router.get('/:id', controller.getFlat)
router.post('/', authAdmin, controller.addFlat)
router.put('/:id', authAdmin, controller.updateFlat)
router.delete('/:id', authAdmin, controller.deleteFlat)

module.exports = router
