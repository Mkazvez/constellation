const { Router } = require('express')
const controller = require('../controllers/covidTypeResult.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidTypeResults)
router.get('/:id', controller.getCovidTypeResult)
router.post('/', controller.addCovidTypeResult)
router.put('/:id', controller.updateCovidTypeResult)
router.delete('/:id', controller.deleteCovidTypeResult)

module.exports = router
