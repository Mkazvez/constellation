const { Router } = require('express')
const controller = require('../controllers/covidEmployee.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidEmployees)
router.get('/v/', controller.getV_CovidEmployees)
router.get('/:id', controller.getCovidEmployee)
router.post('/', controller.addCovidEmployee)
router.put('/:id', controller.updateCovidEmployee)
router.delete('/:id', controller.deleteCovidEmployee)

module.exports = router
