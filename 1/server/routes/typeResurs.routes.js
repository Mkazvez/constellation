const { Router } = require('express')
const controller = require('../controllers/typeResurs.routes')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getTypeResurss)
router.get('/:id', controller.getTypeResurs)
router.post('/', controller.addTypeResurs)
router.put('/:id', controller.updateTypeResurs)
router.delete('/:id', controller.deleteTypeResurs)

module.exports = router
