const { Router } = require('express')
const controller = require('../controllers/Street.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getStreets)
router.get('/v/', controller.getV_Streets)
router.get('/:id', controller.getStreet)
router.post('/', controller.addStreet)
router.put('/:id', controller.updateStreet)
router.delete('/:id', controller.deleteStreet)

module.exports = router
