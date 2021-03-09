const { Router } = require('express')
const controller = require('../controllers/covidUser.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidUsers)
router.get('/:id', controller.getCovidUser)
router.post('/', controller.addCovidUser)
router.put('/:id', controller.updateCovidUser)
router.delete('/:id', controller.deleteCovidUser)

module.exports = router
