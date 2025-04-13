const express = require('express');
const {
  getUniversities,
  getCountries,
  getSpecializations,
  getUniversityById,
  createNewApplication,
  getUniversityByCountryId,
  getFilteredUniversities
} = require('../controller');

const router = express.Router();

router.get('/getUniversities', getUniversities);
router.get('/getCountries', getCountries);
router.get('/getSpecializations', getSpecializations);
router.post('/getUniversityById', getUniversityById);
router.post('/createNewApplication', createNewApplication);
router.post('/getUniversityByCountryId', getUniversityByCountryId);
router.post('/getFilteredUniversities', getFilteredUniversities);

module.exports = router;
