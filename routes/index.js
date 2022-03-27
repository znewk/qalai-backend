const {Router} = require('express')
const router = Router()

const controller = require('../controller')

router.get('/getUniversities', controller.getUniversities)
router.get('/getCountries', controller.getCountries)
router.get('/getSpecializations', controller.getSpecializations)
router.post('/getUniversityById', controller.getUniversityById)
router.post('/getUniversityByCountryId', controller.getUniversityByCountryId)
router.post('/getFilteredUniversities', controller.getFilteredUniversities)
router.post('/createNewApplication', controller.createNewApplication)
module.exports = router;