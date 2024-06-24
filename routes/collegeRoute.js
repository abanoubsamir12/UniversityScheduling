const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

// Routes for college CRUD operations
router.post('/', collegeController.createCollege);
router.get('/', collegeController.getAllColleges);
router.get('//:id', collegeController.getCollegeById);
router.put('//:id', collegeController.updateCollege);
router.delete('/:id', collegeController.deleteCollege);

module.exports = router;