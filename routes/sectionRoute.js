const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Routes for section CRUD operations
router.post('/', sectionController.createSection);
router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSectionById);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

module.exports = router;