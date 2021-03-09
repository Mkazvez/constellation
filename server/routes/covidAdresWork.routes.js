const { Router } = require('express')
const controller = require('../controllers/covidAdresWork.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidAdresWorks)
router.get('/:id', controller.getCovidAdresWork)
router.post('/', controller.addCovidAdresWork)
router.put('/:id', controller.updateCovidAdresWork)
router.delete('/:id', controller.deleteCovidAdresWork)

module.exports = router
