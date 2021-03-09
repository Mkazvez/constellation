const { Router } = require('express')
const controller = require('../controllers/covidReq.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidReqs)
router.get('/:id', controller.getCovidReq)
router.post('/', controller.addCovidReq)
router.put('/:id', controller.updateCovidReq)
router.delete('/:id', controller.deleteCovidReq)

module.exports = router
