const { Router } = require('express')
const controller = require('../controllers/covidResult.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidResults)
router.get('/v/', controller.getV_CovidResults)
router.get('/:id', controller.getCovidResult)
router.post('/', controller.addCovidResult)
router.put('/:id', controller.updateCovidResult)
router.delete('/:id', controller.deleteCovidResult)

module.exports = router
