const { Router } = require('express')
const controller = require('../controllers/typeDocument.routes')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getTypeDocuments)
router.get('/:id', controller.getTypeDocument)
router.post('/', controller.addTypeDocument)
router.put('/:id', controller.updateTypeDocument)
router.delete('/:id', controller.deleteTypeDocument)

module.exports = router
