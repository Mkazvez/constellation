const { Router } = require('express')
const controller = require('../controllers/covidReqLine.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidReqLines)
router.get('/:id', controller.getCovidReqLine)
router.post('/', controller.addCovidReqLine)
router.put('/:id', controller.updateCovidReqLine)
router.delete('/:id', controller.deleteCovidReqLine)

module.exports = router
