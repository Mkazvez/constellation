const { Router } = require('express')
const controller = require('../controllers/covidDepartment.controller')
const authAdmin = require('../middleware/authAdmin')
const router = Router()

router.get('/', controller.getCovidDepartments)
router.get('/:id', controller.getCovidDepartment)
router.post('/', controller.addCovidDepartment)
router.put('/:id', controller.updateCovidDepartment)
router.delete('/:id', controller.deleteCovidDepartment)

module.exports = router
