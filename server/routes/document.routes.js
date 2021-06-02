const { Router } = require('express')
const controller = require('../controllers/document.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getDocuments)
router.get('/v/', controller.v_getDocuments)
router.get('/:id', controller.getDocument)
router.post('/', authAdmin, controller.addDocument)
router.put('/:id', authAdmin, controller.updateDocument)
router.delete('/:id', authAdmin, controller.deleteDocument)

module.exports = router
