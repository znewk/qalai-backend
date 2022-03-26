const {Router} = require('express')
const router = Router()

const controller = require('../controller')

router.get('/getUniversities', controller.getUniversities)
router.get('/getCountries', controller.getCountries)
router.post('/getUniversityById', controller.getUniversityById)
router.post('/getUniversityByCountryId', controller.getUniversityByCountryId)
router.post('/getFilteredUniversities', controller.getFilteredUniversities)

module.exports = router;