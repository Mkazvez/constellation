const { Router } = require('express')
const controller = require('../controllers/covidAdresTest.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidAdresTests)
router.get('/:id', controller.getCovidAdresTest)
router.post('/', controller.addCovidAdresTest)
router.put('/:id', controller.updateCovidAdresTest)
router.delete('/:id', controller.deleteCovidAdresTest)

module.exports = router
