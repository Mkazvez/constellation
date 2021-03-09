const { Router } = require('express')
const controller = require('../controllers/typeStreet.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getTypeStreets)
router.get('/:id', controller.getTypeStreet)
router.post('/', controller.addTypeStreet)
router.put('/:id', controller.updateTypeStreet)
router.delete('/:id', controller.deleteTypeStreet)

module.exports = router
