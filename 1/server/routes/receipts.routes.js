const { Router } = require('express')
const controller = require('../controllers/receipts.controller')
const router = Router()

// router.get('/', controller.getPosts)
// router.get('/:id', controller.getPost)
router.post('/movedReceipt', controller.movedReceipt)
// router.put('/:id', authAdmin, controller.updatePost)
// router.put('/published/:id', authAdmin, controller.setPublished)
// router.delete('/:id', authAdmin, controller.deletePost)

module.exports = router
