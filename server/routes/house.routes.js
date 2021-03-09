const { Router } = require('express')
const controller = require('../controllers/house.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getHouses)
router.get('/v/', controller.getV_Houses)
router.get('/:id', controller.getHouse)
router.post('/', authAdmin, controller.addHouse)
router.put('/:id', authAdmin, controller.updateHouse)
router.delete('/:id', authAdmin, controller.deleteHouse)

module.exports = router
